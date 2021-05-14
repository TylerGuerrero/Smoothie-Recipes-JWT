const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {    
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 6
    }
}, {createdAt: true})

const User = model('User', userSchema)

module.exports = User;