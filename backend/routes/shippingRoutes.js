const express =require('express')
const { isAuth } = require('../utills/auth')
const { addAddress, getAddress, editAddress, deleteAddress } = require('../controllers/shippingController')

const router = express.Router()

// add Address
router.post('/addAddress' , isAuth , addAddress)

// get Address
router.get('/getAddress' ,isAuth , getAddress)

// edit Address
router.put('/editAddress/:id' , isAuth , editAddress)

// delete Address
router.put('/deleteAddress/:id' , isAuth , deleteAddress)

module.exports = router