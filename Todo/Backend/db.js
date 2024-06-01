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
        type: Boolean,
        default: "False"
    }
})

const Todo =  mongoose.model("Todo", todoSchema)

module.exports = {
    Todo
}