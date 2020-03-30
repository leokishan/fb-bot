const express = require('express')
const bodyParser = require('body-parser')
const handlers = require('./src/routes')

const app = express()
let port = process.env.PORT || 8082

// This is commits

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(handlers)

app.listen(port, () => console.log('Listening to 8082'))

module.exports = app
