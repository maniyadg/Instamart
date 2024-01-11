const express = require ('express');
const { isAuth } = require("../utills/auth");
const { myOrders } = require('../controllers/orderController');

const router = express.Router();

// router.post('/checkout' , checkout)

router.get("/my-orders" , isAuth , myOrders );

module.exports = router;