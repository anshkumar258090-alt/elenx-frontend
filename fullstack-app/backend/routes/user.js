const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');
const UserProduct = require('../models/UserProduct');
const Credential = require('../models/Credential');
const Order = require('../models/Order');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

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

// Get User Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId || req.user._id;
    const user = await resolveUser(userId);
    const userObj = user.toObject();
    delete userObj.password;
    res.json(userObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch User's Purchased Products (Ownership Entries) - Filtered by Admin-Controlled Access Rights
router.get('/products', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId || req.user._id;
    const user = await resolveUser(userId);

    const globalProducts = await Product.find({}).lean();
    const userProducts = await UserProduct.find({ user_id: userId }).lean();
    
    // Parse access rights with default fallbacks for legacy/newly created accounts
    const accessRights = user.accessRights || { internal: false, external: false, bypass: false, streamer: false };

    // Print temporary backend logs for debug as requested
    console.log(`[UserProductsAPI] Fetched user data for: ${user.username}`);
    console.log(`[UserProductsAPI] accessRights object:`, accessRights);

    const mergedProducts = [];

    for (const globalProduct of globalProducts) {
      const name = globalProduct.name.toLowerCase();
      let hasAccess = false;

      // Classify and check access rights categories
      if (name.includes('internal') && accessRights.internal) hasAccess = true;
      else if (name.includes('external') && accessRights.external) hasAccess = true;
      else if (name.includes('bypass') && accessRights.bypass) hasAccess = true;
      else if (name.includes('streamer') && accessRights.streamer) hasAccess = true;

      if (hasAccess) {
        // Find actual purchase entry
        const purchase = userProducts.find(p => p.product_id === globalProduct.productId);
        if (purchase) {
          mergedProducts.push(purchase);
        } else {
          // Synthesize active product entry so it instantly appears in library
          mergedProducts.push({
            _id: `virtual-${globalProduct.productId}-${userId}`,
            product_id: globalProduct.productId,
            name: globalProduct.name,
            purchase_date: new Date(),
            expiry_date: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 years (lifetime)
            ownership_status: 'ACTIVE',
            version: globalProduct.version || 'v2.4.1',
            file_size: globalProduct.file_size || '14.8 MB',
            last_updated: new Date()
          });
        }
      }
    }

    console.log(`[UserProductsAPI] Rendered products array:`, mergedProducts.map(p => p.name));
    res.json(mergedProducts);
  } catch (err) {
    console.error('Fetch Purchased Products Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Fetch User's Stored Product Credentials
router.get('/credentials', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId || req.user._id;
    const credentials = await Credential.find({ user_id: userId });
    res.json(credentials);
  } catch (err) {
    console.error('Fetch Credentials Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Save/Update Credentials for a purchased product
router.post('/credentials', auth, async (req, res) => {
  try {
    const { productId, username, password } = req.body;
    const userId = req.user.id || req.user.userId || req.user._id;

    if (!productId || !username || !password) {
      return res.status(400).json({ message: 'All fields (productId, username, password) are required.' });
    }

    // Verify user owns an ACTIVE, non-expired license for this product
    const ownership = await UserProduct.findOne({
      user_id: userId,
      product_id: productId,
      ownership_status: 'ACTIVE',
      expiry_date: { $gt: new Date() }
    });

    if (!ownership) {
      return res.status(403).json({
        message: 'Access Denied: You do not possess an active license key for this product.'
      });
    }

    // Check if credentials already exist for this product and user, if so update, else create
    let credential = await Credential.findOne({ user_id: userId, product_id: productId });
    if (credential) {
      credential.username = username;
      credential.password_hash = password; // simple password storing as per dashboard integration requirements
      await credential.save();
    } else {
      credential = new Credential({
        user_id: userId,
        product_id: productId,
        username,
        password_hash: password
      });
      await credential.save();
    }

    res.json({ message: 'Credentials saved successfully', credential });
  } catch (err) {
    console.error('Save Credentials Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete Credentials
router.delete('/credentials/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId || req.user._id;
    const credential = await Credential.findOneAndDelete({ _id: req.params.id, user_id: userId });
    if (!credential) {
      return res.status(404).json({ message: 'Credentials not found or unauthorized' });
    }
    res.json({ message: 'Credentials deleted successfully' });
  } catch (err) {
    console.error('Delete Credentials Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Checkout Single-Product or Multi-product direct flow
router.post('/checkout', auth, async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty cart items' });
    }

    const userId = req.user.id || req.user.userId || req.user._id;
    const user = await resolveUser(userId);

    let totalAmount = 0;
    let resolvedItems = [];

    // Process each checkout item
    for (const item of items) {
      const { product, duration } = item;

      // Query full product details from database by matching productId with product.id
      const dbProduct = await Product.findOne({ productId: product.id });
      if (!dbProduct) {
        return res.status(404).json({ message: `Product with ID ${product.id} not found.` });
      }

      // Find the pricing duration tier
      const priceTier = dbProduct.pricing.find(p => p.id === duration.id);
      if (!priceTier) {
        return res.status(400).json({ message: `Pricing duration tier ${duration.id} not found.` });
      }
      
      let durationDays = 0;
      if (duration.id === '1day') durationDays = 1;
      else if (duration.id === '1week') durationDays = 7;
      else if (duration.id === '1month') durationDays = 30;
      else if (duration.id === '1year') durationDays = 365;
      else if (duration.id === 'lifetime') durationDays = 3650;

      const itemPrice = priceTier.usd || 0;
      totalAmount += itemPrice;

      resolvedItems.push({
        productId: product.id,
        name: dbProduct.name,
        durationId: duration.id,
        durationLabel: priceTier.label,
        price: itemPrice
      });

      // 1. Add to Legacy User purchasedSubscriptions register (to avoid breaking dashboard overview logic)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + durationDays);

      user.purchasedSubscriptions.push({
        productId: product.id,
        name: dbProduct.name,
        isPremium: dbProduct.isPremium,
        durationLabel: priceTier.label,
        durationDays: durationDays,
        purchaseDate: new Date(),
        expiryDate: expiryDate,
        status: 'ACTIVE',
        version: dbProduct.version || 'v2.4.1'
      });

      // Grant legacy direct access rights based on product name
      const pName = dbProduct.name.toLowerCase();
      if (pName.includes('internal')) user.accessRights.internal = true;
      if (pName.includes('external')) user.accessRights.external = true;
      if (pName.includes('bypass')) user.accessRights.bypass = true;
      if (pName.includes('streamer')) user.accessRights.streamer = true;

      // 2. Create or Extend Personal UserProduct Ownership entry
      let userProduct = await UserProduct.findOne({
        user_id: userId,
        product_id: product.id,
        ownership_status: 'ACTIVE'
      });

      if (userProduct) {
        // Extend existing active subscription
        const currentExpiry = new Date(userProduct.expiry_date);
        const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
        baseDate.setDate(baseDate.getDate() + durationDays);
        userProduct.expiry_date = baseDate;
        userProduct.last_updated = new Date();
        await userProduct.save();
      } else {
        // Create new active subscription ownership
        userProduct = new UserProduct({
          user_id: userId,
          product_id: product.id,
          name: dbProduct.name,
          purchase_date: new Date(),
          expiry_date: expiryDate,
          ownership_status: 'ACTIVE',
          version: dbProduct.version || 'v2.4.1',
          file_size: dbProduct.file_size || '14.8 MB'
        });
        await userProduct.save();
      }
    }

    // Save legacy changes to user object
    await user.save();

    // 3. Log details in Order table
    const order = new Order({
      orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      user_id: userId,
      payment_status: 'SUCCESS',
      amount: totalAmount,
      currency: 'USD',
      items: resolvedItems
    });
    await order.save();

    console.log(`Checkout complete for user: ${user.username || userId}`);
    res.json({ message: 'Checkout successful', subscriptions: user.purchasedSubscriptions, order });
  } catch (err) {
    console.error('Checkout Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Upload Payment Proof
router.post('/upload-payment', auth, upload.single('screenshot'), async (req, res) => {
  try {
    const { productType } = req.body;

    if (!req.file || !productType) {
      return res.status(400).json({ message: 'Both screenshot and product type are required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const userId = req.user.id || req.user.userId || req.user._id;
    const user = await resolveUser(userId);

    user.paymentProofs.push({ imageUrl, productType });
    await user.save();

    res.json({ message: 'Payment proof uploaded successfully', paymentProofs: user.paymentProofs });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Create Client (Reseller Function for backwards compatibility)
router.post('/create-client', auth, async (req, res) => {
  const { username, password, product } = req.body;

  if (!username || !password || !product) {
    return res.status(400).json({ message: 'All fields (username, password, product) are required.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const productType = product.toLowerCase();
    if (!['internal', 'external', 'bypass'].includes(productType)) {
      return res.status(400).json({ message: 'Invalid product type. Must be internal, external, or bypass.' });
    }

    const existingClient = await User.findOne({
      createdBy: req.user.id,
      accessType: productType
    });

    if (existingClient) {
      return res.status(400).json({ message: `You already have a user for ${productType}. Limit is 1 per product.` });
    }

    const newClient = new User({
      username,
      password: password,
      accessType: productType,
      role: 'client',
      createdBy: req.user.id,
      license_status: 'ACTIVE'
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get My Clients
router.get('/my-clients', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId || req.user._id;
    const clients = await User.find({ createdBy: userId }).select('-password');
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Client
router.put('/update-client/:id', auth, async (req, res) => {
  const { username, password, accessType } = req.body;
  try {
    const userId = req.user.id || req.user.userId || req.user._id;
    const client = await User.findOne({ _id: req.params.id, createdBy: userId });
    if (!client) return res.status(404).json({ message: 'Client not found or unauthorized' });

    if (username) client.username = username;
    if (accessType) client.accessType = accessType;
    if (password && password.trim() !== '') {
      client.password = password;
    }

    await client.save();
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Client
router.delete('/delete-client/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId || req.user._id;
    const client = await User.findOneAndDelete({ _id: req.params.id, createdBy: userId });
    if (!client) return res.status(404).json({ message: 'Client not found or unauthorized' });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
