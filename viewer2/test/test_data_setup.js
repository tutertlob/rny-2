const assert = require('assert')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const url = 'mongodb://root:example@localhost:27017'
const dbName = 'sensor'
const coName = 'test'

const client = new MongoClient(url)

const insData = (db, callback) => {
  const documents = [
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
      data: {
        moisture: 668
      }
    },
    {
      sensor: {
        version: 1,
        panid: -1,
        addr: 17478
      },
      received_at: '2019-06-20T22:54:56.552+0900',
      packet_type: 'Notice',
      content_type: 'soilmoisturemonitor;application/json',
      rssi: -71,
      data: {
        moisture: 768
      }
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
      data: {
        moisture: 608
      }
    },
    {
      sensor: {
        version: 1,
        panid: -1,
        addr: 17478
      },
      received_at: '2019-06-20T23:54:56.552+0900',
      packet_type: 'Notice',
      content_type: 'soilmoisturemonitor;application/json',
      rssi: -71,
      data: {
        moisture: 728
      }
    }
  ]
  db.collection(coName).insertMany(documents, (err, result) => {
    assert.equal(err, null)
    assert.equal(4, result.result.n)
    assert.equal(4, result.ops.length)
    console.log('inserted')
    callback(result)
  })
}

const scanData = (db, callback) => {
  db.collection(coName)
    .find({})
    .toArray((err, docs) => {
      assert.equal(err, null)
      console.log(docs)
      callback(docs)
    })
}

client.connect(err => {
  assert.equal(null, err)
  console.log('connected successfully')

  const db = client.db(dbName)
  insData(db, () => {
    scanData(db, () => {
      client.close()
    })
  })
})
