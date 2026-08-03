const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    upiId: { type: String, default: '' },
    qrCodeUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
