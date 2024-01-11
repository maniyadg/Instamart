const express = require ('express');
const { checkout, paymentVerification, codMethod } = require('../controllers/paymentController');
const { isAuth } = require("../utills/auth");

const router = express.Router();

router.post('/checkout' , checkout)

router.post("/paymentverification" , isAuth , paymentVerification );

router.post("/codMethod" , isAuth , codMethod );

module.exports = router;