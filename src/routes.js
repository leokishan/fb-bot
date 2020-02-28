const { Router } = require('express')
const config = require('../static/config.js')
const { handleMessage, handlePostback } = require('./helpers')

const router = Router()

const handleIntent = (req, res) => {
  console.log(req.query)

  res.send('qwerty')
}

const handleLinkverification = (req, res) => {
  // Your verify token. Should be a random string.
  if (req.query['hub.verify_token'] === config.verifyToken) {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Invalid verify token')
  }
}

const handleMessages = (req, res) => {
  let body = req.body

  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0]

      let sender_psid = webhook_event.sender.id

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message)
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback)
      }
    })

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED')
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404)
  }
}

router.get('/', handleIntent)
router.get('/webhook', handleLinkverification)
router.post('/webhook', handleMessages)
module.exports = router
