const axios = require('axios')
const config = require('../static/config.js')

const handleMessage = (sender_id, message) => {
  let response = {
    message: {
      quick_replies: [
        {
          content_type: 'text',
          title: 'Generic message',
          payload: 'generic_template'
        }
      ]
    }
  }
  if (message.quick_reply) {
    response.message = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Harley',
              subtitle: 'Cruzer.',
              image_url:
                'https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
              buttons: [
                {
                  type: 'postback',
                  title: 'Know more',
                  payload: 'Know more'
                }
              ]
            }
          ]
        }
      }
    }
  } else {
    response.message.text = `Back : ${message.text}`
  }
  sendMessage(sender_id, response)
}

const handlePostback = (sender_id, postback) => {
  let response = {
    message: {
      text: `Back: ${postback.payload}`
    }
  }
  sendMessage(sender_id, response)
}

const sendMessage = (sender_id, responseObj) => {
  let responseBody = {
    recipient: { id: sender_id },
    ...responseObj
  }
  axios({
    method: 'post',
    url: 'https://graph.facebook.com/v2.6/me/messages',
    data: responseBody,
    params: { access_token: config.pageAccessToken }
  })
    .then(success => {
      console.log(success.data)
    })
    .catch(err => console.log(err.message))
}

module.exports = {
  handleMessage,
  handlePostback
}
