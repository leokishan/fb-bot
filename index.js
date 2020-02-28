const express = require('express')
const bodyParser = require('body-parser')
const handlers = require('./src/routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(handlers)

app.listen(8082, () => console.log('Listening to 8082'))

module.exports = app
