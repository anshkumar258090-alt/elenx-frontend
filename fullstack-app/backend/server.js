// ElenX Backend Server - v2.1 (Contact form + admin contacts management)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const { auth } = require('./middleware/auth');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for SPA compatibility
  crossOriginEmbedderPolicy: false,
}));
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, please try again later.' },
});
app.use('/api/auth/', authLimiter);

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
const passport = require('./passport');

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
const connectDB = require('./db');
connectDB();

// Keep-alive ping route
app.get('/ping', (req, res) => res.status(200).send('Server Alive'));

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const settingsRoutes = require('./routes/settings');
const payuRoutes = require('./routes/payu');
const Contact = require('./models/Contact');

// Public Contact Form Submission (no auth required)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Name, email, subject and message are required.' });
    }
    const contact = new Contact({ name, email, phone: phone || '', subject, message });
    await contact.save();
    console.log(`[Contact] New message from ${name} <${email}> - Subject: ${subject}`);
    res.status(201).json({ message: 'Message sent successfully! We will get back to you shortly.' });
  } catch (err) {
    console.error('Contact Form Error:', err);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/payu', payuRoutes);

// Route to check MongoDB connection
app.get('/api/test-mongodb', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ message: 'MongoDB connected' });
  } else {
    res.status(500).json({ message: 'MongoDB not connected' });
  }
});

// Check File Status (based on download_url in database)
app.get('/api/files/status', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const products = await Product.find({}).lean();
    const status = {};
    for (const product of products) {
      const key = product.slug || product.name.toLowerCase().replace(/\s+/g, '-');
      status[key] = !!product.download_url;
    }
    res.json(status);
  } catch (err) {
    console.error('Status Check Error:', err);
    res.status(500).json({ message: 'Failed to check file status' });
  }
});

// Secure, authenticated & ownership-validated download system (Link-Based)
const handleSecureDownload = async (req, res) => {
  try {
    const Product = require('./models/Product');
    const param = req.params.id || req.params.productIdOrType;
    let productId = parseInt(param, 10);
    
    let dbProduct = null;
    if (!isNaN(productId)) {
      dbProduct = await Product.findOne({ productId });
    } else {
      // Find by matching slug or name for legacy support
      dbProduct = await Product.findOne({
        $or: [
          { name: new RegExp(param, 'i') },
          { slug: new RegExp(param, 'i') }
        ]
      });
    }

    if (!dbProduct) {
      return res.status(404).json({ message: 'Product not found in system catalog.' });
    }

    // Check if download link is set
    if (!dbProduct.download_url) {
      return res.status(404).json({ message: 'Download link not available yet. Please contact admin.' });
    }

    // Return the download URL for client-side redirect
    res.json({ 
      download_url: dbProduct.download_url,
      product_name: dbProduct.name,
      version: dbProduct.version
    });
  } catch (err) {
    console.error('Secure Download Error:', err);
    res.status(500).json({ message: 'Internal server error during download delivery' });
  }
};

// Register both secure requested path and backward-compatible path
app.get('/secure-download/:id', auth, handleSecureDownload);
app.get('/api/download/:productIdOrType', auth, handleSecureDownload);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
