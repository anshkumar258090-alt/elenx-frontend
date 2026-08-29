const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  discountType: {
    type: String,
    enum: ['PERCENTAGE', 'FIXED'],
    default: 'PERCENTAGE'
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  maxUses: {
    type: Number,
    default: null // null indicates unlimited uses
  },
  usedCount: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    default: null // null indicates no expiry date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: 'Universal discount code'
  },
  createdBy: {
    type: String,
    default: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Coupon', couponSchema);
