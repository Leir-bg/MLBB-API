const express = require('express')
const routes = require('./src/routes')
const config = require('./src/config')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './pages/landing.html'))
})

app.route('/api').get((req, res) => {
	res.json({ message: 'redirect to api landing page' })
})

app.use('/api', routes)

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`)
})