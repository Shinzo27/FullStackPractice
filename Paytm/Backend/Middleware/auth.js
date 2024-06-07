const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken')

function checkForAuthentication() {
    return (req,res,next) => {
        const tokenCookieValue = req.cookies['token']
        if(!tokenCookieValue) {
            return next()
        }

        try {
            const userPayload = jwt.verify(tokenCookieValue, JWT_SECRET)
            req.user = userPayload;
        } catch (error) {}
        return next()
    }
}

module.exports = {
    checkForAuthentication
}