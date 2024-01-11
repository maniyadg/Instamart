const express = require("express");
const { createnewCart, getCart, deleteProduct } = require("../controllers/cartController");
const { isAuth } = require("../utills/auth");


const router = express.Router()

// create cart Route
router.post('/create-cart/:id' ,isAuth, createnewCart )

// get Cart Route
router.get('/get-cartItem' , isAuth ,getCart)

// delete product
router.get('/cart-delProduct/:id' , isAuth , deleteProduct)

module.exports = router