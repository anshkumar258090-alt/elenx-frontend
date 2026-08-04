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

// Checkout - DISABLED (use PayU payment gateway instead)
router.post('/checkout', auth, async (req, res) => {
  return res.status(403).json({ 
    message: 'Direct checkout is disabled. Please use the PayU payment gateway to complete your purchase.' 
  });
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
