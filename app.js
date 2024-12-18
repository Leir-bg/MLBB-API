const express = require('express')
const routes = require('./src/routes')
const config = require('./src/config')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
	res.redirect('/api/')
})

app.use('/api', routes)

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`)
})