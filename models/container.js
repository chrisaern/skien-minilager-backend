const mongoose = require('mongoose')
const { Schema } = mongoose

const containerSchema = new Schema({
    identifier: String,
    char: String,
    number: String,
    size: Number,
    status: Boolean,
    price: Number,
    occupied: Boolean,
    occupiedBy: Number,
    assignedCode: Number,
    images: {
        type: Array,
        default: []
    },
    floor: Number
})

module.exports = mongoose.model('Container', containerSchema)