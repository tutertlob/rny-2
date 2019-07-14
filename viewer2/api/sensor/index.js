const express = require('express')
const router = express.Router()

const log4js = require('log4js')
const logger = log4js.getLogger()

const config = require('config')

logger.level = 'debug'

const client = require('../db')

const findOne = async col => {
  try {
    const result = await col.findOne({})
    return result
  } catch (err) {
    logger.error(err)
  }
}

router.get('/', async (req, res) => {
  const db = client.db(config.mongodb.db)
  const sensor = await findOne(db.collection(config.mongodb.collection.sensor))
  const moisture = await findOne(
    db.collection(config.mongodb.collection.soilmoisture)
  )

  const result = []
  moisture.data.forEach(m => {
    result.push({
      name: sensor[m.id],
      moisture: m.moisture,
      receivedAt: moisture.received_at
    })
  })
  res.send(result)
})

module.exports = router
