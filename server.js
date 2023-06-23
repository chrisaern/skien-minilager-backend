const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString()} - ${req.path} - ${req.method}`)
    next()
})

const container_routes = require('./routes/containers')
app.use('/containers', container_routes)

const user_routes = require('./routes/users')
app.use('/users', user_routes)

app.listen(process.env.PORT, async () => {
    try {
        console.log('Connecting to Mongodb')
        await mongoose.connect(`mongodb+srv://${process.env.DBA_USR}:${process.env.DBA_PW}@cluster0.qeqw4z9.mongodb.net/skien-minilager?retryWrites=true&w=majority`)
        console.log(`Success. Server running on ${process.env.PORT}`)
    } catch(err) {
        console.log(err)
    }
})