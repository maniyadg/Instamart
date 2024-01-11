const jwt = require('jsonwebtoken');
const ls = require('localstorage-slim')

exports.isAuth = async (req, res, next) => {
    const token = ls.get('token')
    console.log(token)
    if (token) {
        let data =  jwt.verify(token, process.env.SECRET_KEY);
        req.user = data.user
        if(!req.user){
            return res.status(401).send({message: 'Not authorized.'})
        }
                    
        return next();
    }

    return res.status(401).send({message: 'Not authorized'})
}