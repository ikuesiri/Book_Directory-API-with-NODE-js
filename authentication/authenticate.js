const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');


const authenticate = async(req, res, next) =>{
    try {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        // return res.status(403).json({message : `Please provide your token`})
        throw new Error(`Please provide your token`)
  
    }

    const token =  authHeader.split(' ')[1];
    // console.log(token)

        const payload = jwt.verify(token, JWT_KEY)

        req.user = ({ userID : payload.userID, username : payload.username})
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authenticate