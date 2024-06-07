const express = require('express')
const { getBalance, transfer } = require('../Controller/account')

const router = express.Router()

router.get('/balance', getBalance)
router.get('/transfer', transfer)
module.exports = router