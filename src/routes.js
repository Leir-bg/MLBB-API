const express = require('express')
const router = express.Router()
const EmblemController = require('./controllers/EmblemController')
const HeroController = require('./controllers/HeroController')
const ItemController = require('./controllers/ItemController')
const dataset = require('../src/config').datafiles

router.use(express.static(`${__dirname}/../pages/`))

router.get('/', (req, res) => {
    res.sendFile('landing.html', {root: `${__dirname}/../pages/`})
})

router.get('/about', (req, res) => {
	res.sendFile('about.html', {root: `${__dirname}/../pages/`})
})

/* Emblem route [start] */
router.get('/emblems', (req, res) => {
    EmblemController.serve(dataset.emblems)
        .then(data => res.status(data.status).json(data.message.data))
        .catch(err => res.status(err.status).json(err.message))
})

router.get('/emblems/detail', (req, res) => {
    const queries = req.query
    if(!queries.id){
        return res.status(400).json({message: 'Invalid query parameters'})
    }

    EmblemController.serve(dataset.emblems)
        .then(data => {
            EmblemController.fetch(data.message.data, queries)
                .then(fd => res.status(200).json(fd))
                .catch(err => res.status(err.status).json(err.message))
        })
        .catch(err => res.status(err.status).json(err.message))
})

router.get('/emblems/detail/talent', (req, res) => {
    const queries = req.query
    if(Object.keys(queries).length === 0){
        return res.status(400).json({message: 'Invalid query parameters'})
    }

    EmblemController.serve(dataset.emblems)
        .then(data => {
            EmblemController.fetch(data.message.data, queries)
                .then(fd => res.status(200).json(fd))
                .catch(err => res.status(err.status).json(err.message))
        })
        .catch(err => res.status(err.status).json(err.message))
})
/* Emblem route [end] */

router.get('/heroes', (req, res) => {
    HeroController.serve(dataset.heroes)
        .then(data => res.status(data.status).json(data.message.data))
        .catch(err => res.status(err.status).send(err.message))
})

router.get('/items', (req, res) => {
    ItemController.serve(dataset.items)
        .then(data => res.status(data.status).json(data.message.data))
        .catch(err => res.status(err.status).send(err.message))
})

module.exports = router