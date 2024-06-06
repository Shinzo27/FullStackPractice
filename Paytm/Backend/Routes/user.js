const express = require('express')
const { UserSignUp, UserSignIn } = require('../Controller/user')

const router = express.Router()

router.post('/signup', UserSignUp)
router.post('/signin', UserSignIn)

module.exports = router