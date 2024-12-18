const express = require('express')
const router = express.Router()
const DataController = require('./controllers/DataController')
const dataset = require('../src/config').datafiles

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/landing.html'))
})

router.get('/emblems', (req, res) => {
    DataController.serveData(dataset.emblems)
        .then(data => res.status(data.status).json(data.message.data))
        .catch(err => res.status(err.status).send(err.message))
})

router.get('/heroes', (req, res) => {
    DataController.serveData(dataset.heroes)
        .then(data => res.status(data.status).json(data.message.data))
        .catch(err => res.status(err.status).send(err.message))
})

router.get('/items', (req, res) => {
    DataController.serveData(dataset.items)
        .then(data => res.status(data.status).json(data.message.data))
        .catch(err => res.status(err.status).send(err.message))
})

module.exports = router