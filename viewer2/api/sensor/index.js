const express = require('express')
const router = express.Router()

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient

const log4js = require('log4js')
const logger = log4js.getLogger()

const config = require('config')

logger.level = 'debug'

const user = config.mongodb.user
const pass = config.mongodb.pass
const host = config.mongodb.host
const port = config.mongodb.port
const dbName = config.mongodb.db
const colNameMoisture = config.mongodb.colMoisture
const colNameSensor = config.mongodb.colSensor

const url = `mongodb://${user}:${pass}@${host}:${port}`
const options = {
  useNewUrlParse: true
}
const client = new MongoClient(url, options)

const setUp = async () => {
  await client.connect()
  logger.info('connected successfully')
}

const findOne = async col => {
  try {
    const result = await col.findOne({})
    return result
  } catch (err) {
    logger.error(err)
  }
}

const findLatest = async col => {
  try {
    const result = await col
      .find({}, { _id: 0, received_at: 1, 'data.moisture': 1 })
      .sort({ received_at: -1 })
      .limit(1)
      .toArray()
    return result[0]
  } catch (err) {
    logger.error(err)
  }
}

router.get('/', async (req, res) => {
  const db = client.db(dbName)
  const coSen = db.collection(colNameSensor)
  const sensor = await findOne(coSen)
  const coMoi = db.collection(colNameMoisture)
  const moisture = await findLatest(coMoi)

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

setUp()

module.exports = router
