const express = require('express')
const router = express.Router()

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient

const log4js = require('log4js')
const logger = log4js.getLogger()

logger.level = 'debug'

const url = 'mongodb://root:example@localhost:27017'
const dbName = 'sensor'
const coName = 'test'
const options = {
  useNewUrlParse: true
}
const client = new MongoClient(url, options)
client.connect(err => {
  if (err != null) {
    logger.error(err)
  } else {
    logger.info('connected successfully')
  }
})

const scanData = (db, callback) => {
  db.collection(coName)
    .find({}, { _id: 0, 'sensor.addr': 1, received_at: 1, 'data.moisture': 1 })
    .sort({ received_at: -1 })
    .limit(2)
    .toArray((err, docs) => {
      if (err == null) {
        logger.debug(docs)
      } else {
        logger.error(err)
      }
      callback(docs)
    })
}

router.get('/', (req, res) => {
  const db = client.db(dbName)
  scanData(db, docs => {
    res.send(docs)
  })
})

module.exports = router
