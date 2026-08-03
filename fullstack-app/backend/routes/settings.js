const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const Settings = require('../models/Settings');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

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
        cb(null, 'qr-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// GET: Fetch Payment Settings (Public or Auth)
router.get('/payment', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            // Return empty default if not set yet
            return res.json({ upiId: '', qrCodeUrl: '' });
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST/PUT: Update Payment Settings (Admin Only)
router.post('/payment', adminAuth, upload.single('qrCode'), async (req, res) => {
    try {
        const { upiId } = req.body;

        // 1. Prepare Update Data
        let updateData = {};
        if (upiId !== undefined) updateData.upiId = upiId;
        if (req.file) updateData.qrCodeUrl = `/uploads/${req.file.filename}`;

        // 2 & 3. Find Or Create (upsert: true will create it if no document matches)
        let settings = await Settings.findOneAndUpdate(
            {}, // match first document
            { $set: updateData },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({
            message: "Payment Configuration saved successfully!",
            settings
        });

    } catch (error) {
        console.error("Settings Save Error:", error);
        res.status(500).json({ message: "Server error while saving configuration." });
    }
});

module.exports = router;
