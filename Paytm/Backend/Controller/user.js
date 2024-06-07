const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const { UserSignUpParser, UserSignInParser, UserUpdateParser } = require('../Validation/type')
const Account = require('../Models/Account')

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

    const createAccount = await Account.create({
        userId: createUser._id,
        balance: 1 + Math.random() * 10000
    })

    const jwtToken = jwt.sign({id: createUser._id}, JWT_SECRET)

    if(createUser && createAccount) return res.cookie("token", jwtToken).status(200).json({
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

const UserUpdate = async(req,res) => {
    const userId = req.user
    const bodyParser = req.body;
    const UpdateParser = UserUpdateParser.safeParse(bodyParser)

    if(!UpdateParser.success) return res.status(400).json({ message: "Fill All The Data!" })
    
    const update = await User.findOneAndUpdate({ _id: userId.id}, { 
        firstName: UpdateParser.data.FirstName,
        lastName: UpdateParser.data.LastName,
        password: UpdateParser.data.Password
    })

    if(update){ 
        return res.status(200).json({ message: "Information Updated Successfully!"})
    } else {
        return res.status(400).json({ message: "Something went wrong!"})
    }
}

const getUsers = async(req,res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }
    ]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
        }))
    })
}

module.exports = {
    UserSignUp,
    UserSignIn,
    UserUpdate,
    getUsers
}