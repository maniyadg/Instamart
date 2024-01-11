const mongoose = require('mongoose')

const db = async() =>{
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log('db connected successfully')
    } catch (error) {
        console.log('Error :' , error)
    }
}

module.exports = db;