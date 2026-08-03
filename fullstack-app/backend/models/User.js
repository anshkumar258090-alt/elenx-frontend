const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String }, // Made optional for Google Auth
  googleId: { type: String, unique: true, sparse: true },
  name: { type: String },
  profilePic: { type: String },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  role: { type: String, default: 'client', enum: ['user', 'admin', 'client'] }, // 'user' acts as Reseller
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
  accessType: { type: String, enum: ['internal', 'external', 'bypass'], default: 'internal' },
  license_status: { type: String, default: 'PENDING', enum: ['PENDING', 'ACTIVE', 'BLOCKED'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accessRights: {
    internal: { type: Boolean, default: false },
    external: { type: Boolean, default: false },
    bypass: { type: Boolean, default: false },
    streamer: { type: Boolean, default: false }
  },
  paymentProofs: [{
    imageUrl: { type: String, required: true },
    productType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }
  }],
  purchasedSubscriptions: [{
    productId: { type: Number },
    name: { type: String },
    isPremium: { type: Boolean },
    durationLabel: { type: String },
    durationDays: { type: Number },
    purchaseDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    status: { type: String, enum: ['ACTIVE', 'EXPIRED'], default: 'ACTIVE' },
    version: { type: String, default: 'v1.0.0' }
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
