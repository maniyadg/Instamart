const mongoose = require('mongoose')

const shippingSchema = mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true,
    },
    postalCode:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.ObjectId,
        ref:'Users',
        required:true
    }
})

module.exports = mongoose.model('Shippings' , shippingSchema)