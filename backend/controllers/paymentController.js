const { error } = require('console');
const orderModel = require('../models/orderModel')
const crypto = require('crypto')
const Razorpay = require('razorpay')

// razorpay
const instance = new Razorpay({
  key_id: rzp_test_gIDwCgImgzka5A,
  key_secret: process.env.RAZORPAY_API_SECRETKEY,
});

const checkout = async (req, res) => {

  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("error :" , error)
  }
}

const paymentVerification = async (req, res) => {

  try {
    const { product, response, amount , shippingInfo , quantity } =
      req.body;
    const body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRETKEY)
      .update(body.toString())
      .digest("hex");

      console.log(expectedSignature)


    const isAuthentic = expectedSignature === response.razorpay_signature;
console.log(isAuthentic)

      if (isAuthentic) {
        // Database comes here
        await orderModel.create({
          shippingInfo:shippingInfo,
          orderItems:[{
            quantity:quantity,
            product:product
          }],
          user: req.user._id,
          payment: {
            razorpay_order_id:response.razorpay_order_id,
            razorpay_payment_id:response.razorpay_payment_id,
            razorpay_signature:response.razorpay_signature,
          }
  
        });
        res.status(200).json({
          success: true,
        });
        // res.redirect(
        //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        // );
      
      } else{
        res.status(400).json({
          success:false
        })
      }

  } catch (error) {
    console.log("error :" , error)
  }
};

const codMethod = async (req, res) => {

  try {
    const { product, shippingInfo , quantity } =
      req.body;

    
        await orderModel.create({
          shippingInfo:shippingInfo,
          orderItems:[{
            quantity:quantity,
            product:product
          }],
          user: req.user._id,
 
        });

        res.status(200).json({
          success: true,
        });
    

  } catch (error) {
    console.log("error :" , error)
  }
};


module.exports = { checkout, paymentVerification , codMethod}
