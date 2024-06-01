const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: String,
        default: "False"
    }
})

const Todo =  mongoose.model("Todo", todoSchema)

module.exports = {
    Todo
}