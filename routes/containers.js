const express = require('express')
const router = express.Router()
const Container = require('../models/container')
const container = require('../models/container')

router.get('/all', async (req, res) => {
    const containers = await Container.find()
    res.send(containers)
})

router.get('/:id', async (req, res) => {
    const container = await Container.findOne({_id: req.params.id})
    res.status(200).send(container)
})

router.post('/book', async (req, res) => {
    const { id } = req.body
    Container.findOneAndUpdate({_id: id}, {occupied: true})
})

router.post('/create', async (req, res) => {
    try {
        const { identifier, char, number, size, price, images, floor, assignedCode, occupied} = req.body
        console.log(req.body)
        const container = new Container({
            identifier: identifier,
            char: char,
            number: number,
            size: size,
            status: false,
            price: price,
            occupied: occupied,
            occupiedBy: null,
            floor: floor,
            assignedCode: assignedCode
        })
    
        await container.save()
        res.status(200).send({msg: 'success'})
    } catch(err) {
        console.log(err)
        res.status(500).send({msg: err})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log(`Handling request to delete container: ${req.params.id}`)
        const container = await Container.findOne({_id: req.params.id})
        if(container) {
            console.log(`Found container. Deleting...`)
            await Container.findOneAndDelete({_id: req.params.id})
            console.log(`Deleted.`)
            res.status(200).send('User deleted successfully!')
        } else {
            res.status(404).send('Cannot find user or user might already be deleted.')
        }
    } catch(err) {
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const validateId = await Container.findByIdAndUpdate({_id: req.params.id}, req.body)
        res.status(200).send('OK')
    } catch(err) {
        console.log(err)
        res.status(500).send('Some internal error happened.')
    }
})

module.exports = router