const express = require('express')
const routes = require('./src/routes')
const config = require('./src/config')
const path = require('path')

const app = express()
app.use('/api', routes)

app.get('/', (req, res) => {
	res.redirect('/api')
})

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`)
})