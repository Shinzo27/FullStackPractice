const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength: 3,
        maxLength: 30
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    },
});

const User = mongoose.model('User', userSchema);

//Export the model
module.exports = User