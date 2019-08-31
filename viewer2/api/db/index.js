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

const url = `mongodb://${user}:${pass}@${host}:${port}`
const options = {
  useNewUrlParser: true
}
const client = new MongoClient(url, options)

const setUp = async () => {
  await client.connect()
  logger.info('connected successfully')
}

setUp()

module.exports = client
