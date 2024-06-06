const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken')

const checkAuthentication = (req,res,next) =>{
    const cookieValue = req.cookies['token']
    if(!cookieValue) {
        return next()
    }

    try {
        const userPayload = jwt.verify(cookieValue, JWT_SECRET)
        req.user = userPayload.id
        return next()
    } catch (error) {
        return next()
    }
}

module.exports = {
    checkAuthentication
}