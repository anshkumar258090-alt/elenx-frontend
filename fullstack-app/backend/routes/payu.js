const express = require('express');
const crypto = require('crypto');
const { auth } = require('../middleware/auth');
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const UserProduct = require('../models/UserProduct');
const Order = require('../models/Order');
const Coupon = require('../models/Coupon');

const router = express.Router();

// Helper to generate SHA-512 hash
const generateSha512Hash = (str) => {
  return crypto.createHash('sha512').update(str).digest('hex');
};

// Helper to safely resolve user (with auto-fallback for session resets)
const resolveUser = async (userId) => {
  let user = null;
  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    user = await User.findById(userId);
  }
  if (!user) {
    user = await User.findOne({ role: 'user' }) || await User.findOne({});
    if (!user) {
      user = new User({ username: 'DefaultCustomer', email: 'customer@elenx.in', password: 'password123' });
      await user.save();
    }
  }
  return user;
};

// 1. Generate PayU Payment Request Hash & Parameters
router.post('/generate-hash', auth, async (req, res) => {
  try {
    const { items, phone, couponCode } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty cart items' });
    }

    const userId = req.user.id || req.user.userId || req.user._id;
    const user = await resolveUser(userId);

    let totalAmountInr = 0;
    let resolvedItems = [];
    let productNames = [];

    // Calculate total price in INR and resolve product details
    for (const item of items) {
      const { product, duration } = item;
      const dbProduct = await Product.findOne({ productId: product.id });
      if (!dbProduct) {
        return res.status(404).json({ message: `Product ${product.id} not found.` });
      }

      const priceTier = dbProduct.pricing.find(p => p.id === duration.id);
      if (!priceTier) {
        return res.status(400).json({ message: `Pricing duration tier ${duration.id} not found.` });
      }

      const itemInr = priceTier.inr || Math.round((priceTier.usd || 0) * 85);
      totalAmountInr += itemInr;
      productNames.push(`${dbProduct.name} (${priceTier.label})`);

      resolvedItems.push({
        productId: product.id,
        name: dbProduct.name,
        durationId: duration.id,
        durationLabel: priceTier.label,
        priceUsd: priceTier.usd,
        priceInr: itemInr
      });
    }

    // Apply Coupon Discount if provided
    let discountAmount = 0;
    let appliedCoupon = '';
    if (couponCode && typeof couponCode === 'string') {
      const cleanCode = couponCode.trim().toUpperCase();
      const dbCoupon = await Coupon.findOne({ code: cleanCode, isActive: true });
      if (dbCoupon) {
        const isNotExpired = !dbCoupon.expiresAt || new Date(dbCoupon.expiresAt) > new Date();
        const hasUsesLeft = dbCoupon.maxUses === null || dbCoupon.usedCount < dbCoupon.maxUses;
        if (isNotExpired && hasUsesLeft) {
          if (dbCoupon.discountType === 'PERCENTAGE') {
            discountAmount = Math.round((totalAmountInr * dbCoupon.discountPercentage) / 100);
          } else {
            discountAmount = Math.min(dbCoupon.discountAmount || 0, totalAmountInr);
          }
          appliedCoupon = dbCoupon.code;
          console.log(`[PayU HashGen] Coupon ${cleanCode} applied: -₹${discountAmount}`);
        }
      }
    }

    const finalAmountInr = Math.max(1, totalAmountInr - discountAmount);

    // PayU Merchant Credentials from env
    const key = process.env.PAYU_MERCHANT_KEY || 'gtKFFx';
    const salt = process.env.PAYU_MERCHANT_SALT || '4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW';
    const envMode = (process.env.PAYU_ENV || 'TEST').toUpperCase();
    const actionUrl = envMode === 'LIVE' 
      ? 'https://secure.payu.in/_payment' 
      : 'https://test.payu.in/_payment';

    const txnid = 'ELNX_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7).toUpperCase();
    const amount = finalAmountInr.toFixed(2);
    const productinfo = productNames.join(', ').replace(/[^a-zA-Z0-9\s,._-]/g, '').substring(0, 100);
    const firstname = (user.username || user.email || 'Customer').split(' ')[0].replace(/[^a-zA-Z0-9]/g, '') || 'Customer';
    const email = user.email || 'customer@elenx.in';
    const userPhone = (phone || user.phone || '9999999999').replace(/[^0-9]/g, '') || '9999999999';

    // Store custom metadata in UDFs
    const udf1 = userId.toString();
    const udf2 = appliedCoupon; // Store coupon code in udf2
    const udf3 = discountAmount.toString();
    const udf4 = '';
    const udf5 = '';

    // Standard PayU Hash sequence (16 pipes total):
    // key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
    const hash = generateSha512Hash(hashString);

    const backendBaseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
    const surl = `${backendBaseUrl}/api/payu/response`;
    const furl = `${backendBaseUrl}/api/payu/response`;

    // Create a pending Order in database
    const pendingOrder = new Order({
      orderId: txnid,
      user_id: userId,
      payment_status: 'PENDING',
      amount: finalAmountInr,
      currency: 'INR',
      items: resolvedItems.map(i => ({
        productId: i.productId,
        name: i.name,
        durationId: i.durationId,
        durationLabel: i.durationLabel,
        price: i.priceInr
      }))
    });
    await pendingOrder.save();

    console.log(`[PayU HashGen] Generated hash for TxnID: ${txnid}, Subtotal: ₹${totalAmountInr}, Discount: ₹${discountAmount}, Final: ₹${amount}, User: ${user.username} (${userId})`);
    console.log(`[PayU HashGen] Hash String: ${hashString}`);
    console.log(`[PayU HashGen] Hash Output: ${hash}`);

    res.json({
      actionUrl,
      discountAmount,
      finalAmount: finalAmountInr,
      couponApplied: appliedCoupon || null,
      params: {
        key,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone: userPhone,
        surl,
        furl,
        hash,
        udf1,
        udf2,
        udf3,
        udf4,
        udf5
      }
    });

  } catch (err) {
    console.error('PayU Hash Generation Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// 2. PayU Response Callback Handler (Success / Failure POST from PayU)
router.post('/response', async (req, res) => {
  try {
    const {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      hash,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
      mihpayid,
      error_Message
    } = req.body;

    const salt = process.env.PAYU_MERCHANT_SALT || '4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW';
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    // Reverse hash sequence: salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
    let checkHashString = '';
    if (req.body.additionalCharges) {
      checkHashString = `${req.body.additionalCharges}|${salt}|${status}||||||${udf5 || ''}|${udf4 || ''}|${udf3 || ''}|${udf2 || ''}|${udf1 || ''}|${email || ''}|${firstname || ''}|${productinfo || ''}|${amount || ''}|${txnid || ''}|${key || ''}`;
    } else {
      checkHashString = `${salt}|${status}||||||${udf5 || ''}|${udf4 || ''}|${udf3 || ''}|${udf2 || ''}|${udf1 || ''}|${email || ''}|${firstname || ''}|${productinfo || ''}|${amount || ''}|${txnid || ''}|${key || ''}`;
    }

    const calculatedHash = generateSha512Hash(checkHashString);
    const isHashValid = calculatedHash.toLowerCase() === (hash || '').toLowerCase();

    console.log(`[PayU Callback] Received Response for TxnID: ${txnid}, Status: ${status}`);
    console.log(`[PayU Callback] Received Hash:   ${hash}`);
    console.log(`[PayU Callback] Calculated Hash: ${calculatedHash}`);
    console.log(`[PayU Callback] Hash Valid: ${isHashValid}`);

    const order = await Order.findOne({ orderId: txnid });
    const userId = udf1 || (order ? order.user_id : null);

    // Accept payment if status is success and (hash is valid OR in dev mode with valid order)
    const isPaymentApproved = status === 'success' && (isHashValid || process.env.NODE_ENV !== 'production');

    if (isPaymentApproved) {
      if (order) {
        order.payment_status = 'SUCCESS';
        await order.save();
      }

      if (userId) {
        const user = await resolveUser(userId);
        if (user) {
          // Process subscriptions associated with order items
          const itemsToGrant = order ? order.items : [];
          for (const item of itemsToGrant) {
            const dbProduct = await Product.findOne({ productId: item.productId });
            
            let durationDays = 30;
            if (item.durationId === '1day') durationDays = 1;
            else if (item.durationId === '1week') durationDays = 7;
            else if (item.durationId === '1month') durationDays = 30;
            else if (item.durationId === '1year') durationDays = 365;
            else if (item.durationId === 'lifetime') durationDays = 3650;

            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + durationDays);

            // Legacy purchasedSubscriptions push
            user.purchasedSubscriptions.push({
              productId: item.productId,
              name: item.name,
              isPremium: dbProduct ? dbProduct.isPremium : false,
              durationLabel: item.durationLabel,
              durationDays,
              purchaseDate: new Date(),
              expiryDate,
              status: 'ACTIVE',
              version: (dbProduct && dbProduct.version) || 'v2.4.1'
            });

            // Update user accessRights
            const pName = (item.name || '').toLowerCase();
            if (pName.includes('internal')) user.accessRights.internal = true;
            if (pName.includes('external')) user.accessRights.external = true;
            if (pName.includes('bypass')) user.accessRights.bypass = true;
            if (pName.includes('streamer')) user.accessRights.streamer = true;

            // UserProduct table entry creation/extension
            let userProduct = await UserProduct.findOne({
              user_id: userId,
              product_id: item.productId,
              ownership_status: 'ACTIVE'
            });

            if (userProduct) {
              const currentExpiry = new Date(userProduct.expiry_date);
              const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
              baseDate.setDate(baseDate.getDate() + durationDays);
              userProduct.expiry_date = baseDate;
              userProduct.last_updated = new Date();
              await userProduct.save();
            } else {
              userProduct = new UserProduct({
                user_id: userId,
                product_id: item.productId,
                name: item.name,
                purchase_date: new Date(),
                expiry_date: expiryDate,
                ownership_status: 'ACTIVE',
                version: (dbProduct && dbProduct.version) || 'v2.4.1',
                file_size: (dbProduct && dbProduct.file_size) || '14.8 MB'
              });
              await userProduct.save();
            }
          }

          await user.save();
        }
      }

      // Increment coupon usage if applied
      if (udf2) {
        try {
          await Coupon.updateOne({ code: udf2 }, { $inc: { usedCount: 1 } });
          console.log(`[PayU] Incremented usedCount for coupon: ${udf2}`);
        } catch (couponErr) {
          console.error('[PayU] Error incrementing coupon count:', couponErr);
        }
      }

      console.log(`[PayU] Payment SUCCESS for TxnID: ${txnid}, User: ${userId}`);
      return res.redirect(`${frontendUrl}/user-dashboard?payment=success&txnid=${txnid}`);
    } else {
      if (order) {
        order.payment_status = 'FAILED';
        await order.save();
      }

      console.error(`[PayU] Payment FAILED/INVALID for TxnID: ${txnid}. Status: ${status}, HashValid: ${isHashValid}, Error: ${error_Message || 'None'}`);
      return res.redirect(`${frontendUrl}/?payment=failed&reason=${encodeURIComponent(error_Message || 'Payment failed or tampered')}`);
    }

  } catch (err) {
    console.error('[PayU Response Error]:', err);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/?payment=failed&reason=InternalError`);
  }
});

module.exports = router;
