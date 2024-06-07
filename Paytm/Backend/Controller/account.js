const Account = require("../Models/Account")
const mongoose = require('mongoose')

const getBalance = async(req,res) => {
    const userId = req.user

    const account = await Account.findOne({userId: userId.id})

    res.status(200).json({
        balance: account.balance
    })
}

const transfer = async(req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction()
    const { amount, to } = req.body

    const account = await Account.findOne({userId: req.user.id}).session(session)

    if(!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient Balance!"
        });
    }

    const toAccount = await Account.findOne({userId: to}).session(session)

    if(!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid Account!"
        })
    }

    await Account.updateOne({ userId: req.user.id}, { $inc: { balance: -amount}}).session(session)
    await Account.updateOne({ userId: to}, { $inc: { balance: amount}}).session(session)

    await session.commitTransaction()

    return res.status(200).json({
        message: "Transfer Successful!"
    })
}

module.exports = {
    getBalance,
    transfer
}