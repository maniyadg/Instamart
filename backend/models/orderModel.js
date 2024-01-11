const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  shippingInfo: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'Shippings'
  },
  user: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Users'
  },
  orderItems: [{
      quantity: {
          type: Number,
          required: true
      },
      product: {
          type: mongoose.ObjectId,
          required: true,
          ref: 'Posts'
      }

  }],
  itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
  },
  taxPrice: {
      type: Number,
      required: true,
      default: 0.0
  },
  shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
  },
  totalPrice: {
      type: Number,
      required: true,
      default: 0.0
  },
  payment: {},

  paidAt: {
      type: Date
  },
  deliveredAt: {
      type: Date
  },
  orderStatus: {
      type: String,
      required: true,
      default: 'Processing'
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
})

module.exports = mongoose.model('Order', orderSchema);

