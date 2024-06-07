const Account = require("../Models/Account")


const getBalance = async(req,res) => {
    const userId = req.user

    const account = await Account.findOne({userId: userId.id})

    res.status(200).json({
        balance: account.balance
    })
}

module.exports = {
    getBalance
}