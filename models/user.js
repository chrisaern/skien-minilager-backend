const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number,
        default: 20
    },
    validated: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)