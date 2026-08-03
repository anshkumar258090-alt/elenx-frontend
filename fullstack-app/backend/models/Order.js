const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payment_status: { type: String, default: 'SUCCESS', enum: ['SUCCESS', 'PENDING', 'FAILED'] },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  items: [{
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    durationId: { type: String, required: true },
    durationLabel: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
