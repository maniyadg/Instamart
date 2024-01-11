const jwt = require('jsonwebtoken')
const ls = require('localstorage-slim')

const sendToken = (user, statusCode, req , res) => {

    // if Password is correct to generate Token
    const token = jwt.sign({ user }, process.env.secret_key, {
        expiresIn: "1d",

    })

    ls.set("token", token)

    res.cookie('accessToken', token, {expire: new Date() + 86400000})

    res.status(statusCode).send({
        success: true,
        user,
        token
    })

}

module.exports = sendToken;