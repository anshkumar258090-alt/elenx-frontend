const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const router = express.Router();
const passport = require('passport');
const rateLimit = require('express-rate-limit');

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { message: "Too many login attempts from this IP, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

// User Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET || 'secret');
    res.status(201).json({ message: 'User registered successfully', token, role: 'user' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username || req.body.email }]
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    let isMatch = false;
    // Check if the stored password looks like a bcrypt hash (starts with $2b$ or $2a$)
    if (user.password && (user.password.startsWith('$2b$') || user.password.startsWith('$2a$'))) {
      isMatch = await bcrypt.compare(req.body.password, user.password);
    } else {
      // Plain text comparison
      isMatch = (req.body.password === user.password);
    }

    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET || 'secret');
    res.status(200).json({ message: "Login successful", token, role: 'user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin Login
router.post('/admin/login', adminLoginLimiter, async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'secret');
    res.json({ token, role: 'admin' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Integrations

// Test Route to verify authRoutes is mounted correctly
router.get('/test', (req, res) => {
  console.log('Auth test route hit');
  res.send('AUTH WORKING');
});

// Initiates Google OAuth for Admin
router.get('/google/admin', adminLoginLimiter, (req, res, next) => {
  console.log("Google admin route hit");
  passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    state: 'admin' 
  })(req, res, next);
});

// Initiates Google OAuth for Client
router.get('/google/client', (req, res, next) => {
  console.log("Client Google route hit");
  passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    state: 'client' 
  })(req, res, next);
});

// Google OAuth Callback
router.get('/google/callback', (req, res, next) => {
  console.log("Google callback route hit");
  const isStateAdmin = req.query.state === 'admin';
  const errorRedirectUrl = isStateAdmin ? `${process.env.FRONTEND_URL}/admin/login` : `${process.env.FRONTEND_URL}/login`;

  passport.authenticate('google', { failureRedirect: `${errorRedirectUrl}?error=Google_Auth_Failed` }, async (err, user, info) => {
    if (err) {
      console.error('Google Callback Setup Error:', err);
      return res.redirect(`${errorRedirectUrl}?error=Server_Error`);
    }
    if (!user) {
      return res.redirect(`${errorRedirectUrl}?error=${encodeURIComponent(info && info.message ? info.message : 'Unauthorized')}`);
    }

    // Generate JWT matching the standard token
    const token = jwt.sign({ id: user._id, role: user.role || 'user' }, process.env.JWT_SECRET || 'secret');
    
    // Redirect to frontend AuthSuccess handler
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}&role=${user.role || 'user'}`);
  })(req, res, next);
});

module.exports = router;
