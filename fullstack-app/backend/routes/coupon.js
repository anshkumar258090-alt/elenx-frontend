const express = require('express');
const Coupon = require('../models/Coupon');

const router = express.Router();

// Public Coupon Validation
router.post('/validate', async (req, res) => {
  try {
    const { code, amount } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ valid: false, message: 'Please provide a valid coupon code.' });
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = await Coupon.findOne({ code: cleanCode });

    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Coupon code not found.' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ valid: false, message: 'This coupon code has been deactivated.' });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({ valid: false, message: 'This coupon code has expired.' });
    }

    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({ valid: false, message: 'This coupon has reached its maximum usage limit.' });
    }

    const subtotal = Number(amount) || 0;
    let discountAmount = 0;

    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = Math.round((subtotal * coupon.discountPercentage) / 100);
    } else if (coupon.discountType === 'FIXED') {
      discountAmount = Math.min(coupon.discountAmount || 0, subtotal);
    }

    const discountedTotal = Math.max(0, subtotal - discountAmount);

    res.json({
      valid: true,
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      discountType: coupon.discountType,
      discountAmount,
      originalAmount: subtotal,
      discountedTotal,
      message: `Success! ${coupon.discountPercentage}% discount applied.`
    });
  } catch (err) {
    console.error('Coupon Validation Error:', err);
    res.status(500).json({ valid: false, message: 'Server error validating coupon code.' });
  }
});

module.exports = router;
