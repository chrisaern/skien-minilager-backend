const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

router.get('/all', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        if(user) {
            res.status(200).send(user)
        } else {
            res.status(404).send('Cannot find user')
        }
    } catch(err) {
        console.log(err)
        res.status(500).send({err: err})
    }
})

router.post('/create', async (req, res) => {
    console.log('Recieved request to create user.')
    try {
        const { email, password, first_name, last_name, role} = req.body
        console.log('Creating user object.')
        const user = new User({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                role: role
        })
        console.log('Attempting to save to db..')
        await user.save()
        res.status(200).send('OK')
        console.log('User created successfully.')
    } catch(err) {
        console.log(err)
        res.status(500).send('Internal error')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log('Initiating delete process..')
        const user = User.findOne({_id: req.params.id})
        if(user) {
            console.log('Found a user with ID: ' + req.params.id)
            await User.findOneAndDelete({_id: req.params.id})
            console.log('User deleted.')
            res.status(200).send('User deleted!')
        }
        else {
            console.log('Cannot find the user in db.')
            res.status(404).send('Cannot find user.')
        }
    } catch(err) {
        console.log(err)
        res.send(500).send({err: err})
    }
})


module.exports = router