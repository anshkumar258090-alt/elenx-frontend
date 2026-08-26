const express = require('express');
const { adminAuth } = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
const Product = require('../models/Product');

const router = express.Router();

// Get All Users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        { createdBy: { $exists: false } },
        { createdBy: null }
      ]
    }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update License Status
router.put('/users/:id/license', adminAuth, async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { license_status: status }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // RESOLVE PATH ABSOLUTELY to prevent issues
    const uploadDir = path.join(__dirname, '../uploads');
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Created uploads directory:', uploadDir);
      }
    } catch (err) {
      console.error('Error creating uploads directory:', err);
      return cb(err);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const type = req.params.type;
    let filename = '';

    // Strict Filename Mapping
    if (type === 'internal') filename = 'internal.exe';
    else if (type === 'external') filename = 'external.exe';
    else if (type === 'bypass') filename = 'bypass.exe';
    else return cb(new Error('Invalid file type requested'));

    // Remove existing file if it exists to ensure overwrite
    const uploadDir = path.join(__dirname, '../uploads');
    const filePath = path.join(uploadDir, filename);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      // Ignore unlink error, multer handles overwrite usually but this ensures it
      console.warn('Error deleting existing file:', err);
    }

    cb(null, filename);
  }
});

const upload = multer({ storage: storage }).single('file');

// Upload Endpoint with explicit Error Handling
router.post('/upload/:type', adminAuth, (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error('Multer Error:', err);
      return res.status(500).json({ message: `Upload Error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error('Unknown Upload Error:', err);
      return res.status(500).json({ message: `Server Error: ${err.message}` });
    }

    // Everything went fine
    if (!req.file) return res.status(400).json({ message: 'No file provided' });

    console.log(`File uploaded successfully: ${req.file.filename}`);
    res.json({ message: `${req.params.type.toUpperCase()} uploaded successfully.` });
  });
});

// Delete File Endpoint
router.delete('/files/:type', adminAuth, (req, res) => {
  try {
    const type = req.params.type;
    let filename = '';
    if (type === 'internal') filename = 'internal.exe';
    else if (type === 'external') filename = 'external.exe';
    else if (type === 'bypass') filename = 'bypass.exe';
    else return res.status(400).json({ message: 'Invalid file type' });

    const filePath = path.join(__dirname, '../uploads', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filename}`);
      res.json({ message: `${type} file deleted successfully` });
    } else {
      res.status(404).json({ message: 'File not found on server' });
    }
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: `Delete failed: ${err.message}` });
  }
});

// Create User
router.post('/create-user', adminAuth, async (req, res) => {
  const { username, password, accessType } = req.body;
  try {
    const newUser = new User({
      username,
      password: password, // Store plainly
      accessType: accessType || 'internal',
      role: 'user',
      license_status: 'ACTIVE' // auto-active as per request
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update User (Access Type & Password)
router.put('/update-user/:id', adminAuth, async (req, res) => {
  const { username, password, accessType } = req.body;
  try {
    const updateData = {};
    if (username) updateData.username = username;
    if (accessType) updateData.accessType = accessType;
    if (password && password.trim() !== '') {
      updateData.password = password; // Store plainly
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete User
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET USER DETAILS FOR MANAGE MODAL
router.get('/user-details/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch clients generated by this user
    const generatedClients = await User.find({ createdBy: req.params.id }).select('username password accessType status');

    res.json({ webUser: user, panelClients: generatedClients });
  } catch (error) {
    console.error("Backend Error in /user-details/:", error);
    res.status(500).json({ message: "Server error fetching user details" });
  }
});

// Update User Access Rights - Instant Saves from Admin switches
router.put('/user-access/:id', adminAuth, async (req, res) => {
  const { accessRights } = req.body;
  console.log(`[AdminAPI] Received access rights update request for User ID: ${req.params.id}`);
  console.log(`[AdminAPI] Target accessRights values:`, accessRights);

  if (!accessRights) {
    return res.status(400).json({ message: 'Missing accessRights payload' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.warn(`[AdminAPI] User not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    // Set fields explicitly and robustly with boolean casting
    user.accessRights = {
      internal: accessRights.internal === true,
      external: accessRights.external === true,
      bypass: accessRights.bypass === true,
      streamer: accessRights.streamer === true
    };

    const savedUser = await user.save();
    console.log(`[AdminAPI] Database response: Access rights saved successfully for User: ${savedUser.username}`);
    res.json(savedUser);
  } catch (err) {
    console.error(`[AdminAPI] Error updating access rights for User ID ${req.params.id}:`, err);
    res.status(500).json({ message: err.message });
  }
});

// ===== CONTACT MESSAGE MANAGEMENT =====

// Get All Contact Messages (sorted newest first)
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('Fetch Contacts Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get Unread Contact Count
router.get('/contacts/unread-count', adminAuth, async (req, res) => {
  try {
    const count = await Contact.countDocuments({ isRead: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark Contact Message as Read
router.put('/contacts/:id/read', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Marked as read', contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Contact Message
router.delete('/contacts/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== PRODUCT DOWNLOAD LINK MANAGEMENT =====

// Get All Products (for Build Manager)
router.get('/products', adminAuth, async (req, res) => {
  try {
    const products = await Product.find({}).sort({ productId: 1 });
    res.json(products);
  } catch (err) {
    console.error('Fetch Products Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update Download Link for a Product
router.put('/product/:productId/download-link', adminAuth, async (req, res) => {
  try {
    const { download_url } = req.body;
    const productId = parseInt(req.params.productId, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.download_url = download_url || '';
    await product.save();

    console.log(`[Admin] Download link ${download_url ? 'updated' : 'removed'} for product: ${product.name}`);
    res.json({ message: `Download link ${download_url ? 'saved' : 'removed'} successfully`, product });
  } catch (err) {
    console.error('Update Download Link Error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
