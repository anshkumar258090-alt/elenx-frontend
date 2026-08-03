const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  version: { type: String, default: 'v2.4.1' },
  description: { type: String },
  image: { type: String },
  file_path: { type: String, required: true },
  file_size: { type: String, default: '14.8 MB' },
  features: [{ type: String }],
  compatibility: { type: String, default: 'Windows 10 / 11 (All Versions)' },
  isPremium: { type: Boolean, default: false },
  pricing: [{
    id: { type: String, required: true }, // e.g. '1day', '1month'
    label: { type: String, required: true }, // e.g. '1 Day', '1 Month'
    usd: { type: Number, required: true },
    inr: { type: Number, required: true }
  }],
  status: { type: String, default: 'UNDETECTED' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
