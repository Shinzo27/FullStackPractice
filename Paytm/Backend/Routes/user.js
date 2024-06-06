const express = require('express')
const { UserSignUp, UserSignIn, UserUpdate, getUsers } = require('../Controller/user')

const router = express.Router()

router.post('/signup', UserSignUp)
router.post('/signin', UserSignIn)
router.put('/update', UserUpdate)
router.get('/get', getUsers)

module.exports = router