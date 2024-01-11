const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    likes: [{
      type: mongoose.ObjectId,
      ref: "Users",
    }],
    images: [
      {
        image: {
          type: String,
          required: true
        }
      }
    ],
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "Users",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },


    comment: [{
      type: mongoose.ObjectId,
      ref: 'comment'
    }]


  },
  { timestamps: true }
);


module.exports = mongoose.model("Posts", postSchema);