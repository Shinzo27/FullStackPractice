const express = require('express')
const {getBalance} = require('../Controller/account')

const router = express.Router()

router.get('/balance', getBalance)

module.exports = router