const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({

  user: {
    type: mongoose.ObjectId,
    ref: "Users",
    required: true,
  },
  items: [{
    product: {
      type: mongoose.ObjectId,
      ref: "Posts",
      required: true,
    },
    name: String,
    image:String,
    quantity: {
      type: Number,
      required: true,
    },
    price: Number
  }],
})

module.exports = mongoose.model("Cart", cartSchema);