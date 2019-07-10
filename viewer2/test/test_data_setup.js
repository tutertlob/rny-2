const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const url = 'mongodb://root:example@localhost:27017'
const dbName = 'rny2'
const colSoilMoisture = 'soilmoisture'
const colSensor = 'sensor'
const options = { useNewUrlParser: true }

const sensorData = {
  1: 'Morning glory',
  2: 'Sunflower',
  3: 'Cosmos',
  4: 'Tomato'
}

const moistureData = [
  {
    sensor: {
      version: 1,
      panid: -1,
      addr: 17477
    },
    received_at: '2019-06-20T22:54:56.552+0900',
    packet_type: 'Notice',
    content_type: 'soilmoisturemonitor;application/json',
    rssi: -71,
    data: [
      { id: 1, moisture: 668 },
      { id: 2, moisture: 409 },
      { id: 3, moisture: 711 },
      { id: 4, moisture: 235 }
    ]
  },
  {
    sensor: {
      version: 1,
      panid: -1,
      addr: 17477
    },
    received_at: '2019-06-20T23:54:56.552+0900',
    packet_type: 'Notice',
    content_type: 'soilmoisturemonitor;application/json',
    rssi: -71,
    data: [
      { id: 1, moisture: 568 },
      { id: 2, moisture: 309 },
      { id: 3, moisture: 611 },
      { id: 4, moisture: 135 }
    ]
  }
]

const insOne = async (col, doc) => {
  await col.insertOne(doc)
}

const insMany = async (col, docs) => {
  await col.insertMany(docs)
}

const delMany = async col => {
  await col.deleteMany({})
}
const scanData = async col => {
  const result = await col.find({}).toArray()
  return result
}

const main = async () => {
  const client = new MongoClient(url, options)
  const con = await client.connect()
  console.log('connected successfully')

  const db = con.db(dbName)

  const coSen = db.collection(colSensor)
  await delMany(coSen)
  await insOne(coSen, sensorData)
  const docSen = await scanData(coSen)
  console.log(docSen)

  const coMoi = db.collection(colSoilMoisture)
  await delMany(coMoi)
  await insMany(coMoi, moistureData)
  const docMoi = await scanData(coMoi)
  console.log(docMoi)

  client.close()
}

main()
