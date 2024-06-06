const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const { UserSignUpParser, UserSignInParser } = require('../Validation/type')

const UserSignUp = async(req,res) => {
    const BodyParsher = req.body;
    const UserPayload = UserSignUpParser.safeParse(BodyParsher)
    if(!UserPayload.success) {
        return res.status(400).json({
            message: "Enter Data Correctly!"
        })
    }

    const alreadyExist = await User.findOne({username: UserPayload.data.Username})
    if(alreadyExist) return res.status(400).json({ message: "User With This Username Already Exists!"})

    const createUser = await User.create({
        username: UserPayload.data.Username,
        firstName: UserPayload.data.FirstName,
        lastName: UserPayload.data.LastName,
        password: UserPayload.data.Password
    })

    const jwtToken = jwt.sign(createUser._id, JWT_SECRET)

    if(createUser) return res.cookie("token", jwtToken).status(200).json({
        message: "User Created",
        userId: createUser._id,
        jwt: jwtToken
    })
    else{
        return res.status(400).json({
            message: "Something Went Wrong!"
        })
    }
}

const UserSignIn = async(req,res) => {
    const BodyParsher = req.body;
    const UserPayload = UserSignInParser.safeParse(BodyParsher)
    if(!UserPayload.success) {
        return res.status(400).json({
            message: "Enter Data Correctly!"
        })
    }

    const loggedinUser = await User.findOne({username: UserPayload.data.Username, password: UserPayload.data.Password})

    if(!loggedinUser) return res.status(400).json({ message: "User Not Found!" })

    const payload = { id: loggedinUser._id }

    const jwtToken = jwt.sign(payload, JWT_SECRET)

    return res.cookie("token", jwtToken).status(200).json({
        message: "User Logged In",
        jwt: jwtToken
    })
}

module.exports = {
    UserSignUp,
    UserSignIn
}