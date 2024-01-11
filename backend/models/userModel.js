const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 30,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    avatar: {
        type: String
    },
    phone: {
        type: Number
    },
    posts: {
        type: Number,
        default: 0,
        ref: "Products"
    },
    followers: [{
        type: mongoose.ObjectId,
        ref: "Users"
    }],
    following: [{
        type: mongoose.ObjectId,
        ref: "Users"
    }]
});

module.exports = mongoose.model('Users', userSchema)