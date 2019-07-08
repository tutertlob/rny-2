const express = require('express')
const app = express()
const sensor = require('./sensor')

app.use('/sensor', sensor)
app.get('/test', (req, res) => {
  res.send('API server works fine')
})

module.exports = {
  path: '/api',
  handler: app
}
