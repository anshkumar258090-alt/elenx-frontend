const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google Auth
  email: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  name: { type: String },
  profilePic: { type: String },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
});

module.exports = mongoose.model('Admin', adminSchema);
