const userModel = require('../models/userModel')
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const cartModel = require("../models/cartModel.js");
const Product = require("../models/postModel.js");

const ErrorHandler = require('../utills/errorHandler');

// create Cart
const createnewCart = catchAsyncError(async (req, res, next) => {
  try {
    const product = req.params.id
    const user = req.user._id
    const { quantity } = req.body

    const cart = await cartModel.findOne({ user })
    const extistingProduct = await Product.findOne({ _id: product })

    const name = extistingProduct.name
    const price = extistingProduct.price
    const image = extistingProduct.images[0].image
    console.log(extistingProduct.name)

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex(p => p.product == product);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      }
      else {
        cart.items.push({ product, name, quantity, price ,image});
      }
      await cart.save();
      return res.status(201).send({
        success: true,
        message: "Cart Added", cart
      });
    }
    else {
      // no cart exists, create one
      const newCart = await cartModel.create({
        user,
        items: [{ product, name, quantity, price , image}],
      });
      return res.status(201).send({
        success: true,
        message: "Cart Added", newCart
      });
    }


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
});


// get prdocyst by user
const getCart = catchAsyncError(async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    const cart = await cartModel.find({ user }).populate("items.product");
    if(cart ){
      res.status(200).send({
        success: true,
        cart,
      });  }
  else{
      res.send(null);
  }

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
});


// delete product
const deleteProduct = catchAsyncError(async (req, res) => {
  const product = req.params.id;
  const user = req.user._id
  try{
      let cart = await cartModel.findOne({user});
      let itemIndex = cart.items.findIndex(p => p.product == product);
      if(itemIndex > -1)
      {
          let productItem = cart.items[itemIndex];
          cart.items.splice(itemIndex,1);
      }
      const Carts = await cart.save();
      return res.status(201).send({
        success:true,
        message: 'Removed Successfully',
        Carts
      });
  }
  catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
  }
})


module.exports = { createnewCart, getCart, deleteProduct }