const mongoose = require('mongoose');

const userProductSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  purchase_date: { type: Date, default: Date.now },
  expiry_date: { type: Date, required: true },
  ownership_status: { type: String, enum: ['ACTIVE', 'EXPIRED'], default: 'ACTIVE' },
  version: { type: String, default: 'v2.4.1' },
  file_size: { type: String, default: '14.8 MB' },
  last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserProduct', userProductSchema);
