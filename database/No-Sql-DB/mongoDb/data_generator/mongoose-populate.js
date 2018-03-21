const generate = require('./faker')
const MongoClient = require('mongodb').MongoClient
const URL = 'mongodb://localhost:27017'

const tenMilReview = async () => {
  const clientConnect = await MongoClient.connect(URL)
  const mongoDb = clientConnect.db('amenities')
  const collection = mongoDb.collection('amenities')

  let guests = []
  for (let i = 0; i <= 10000000; i++) {
    if (i !== 0 && i % 100000 === 0) {
      await collection.insertMany(guests)
      console.log('100000', i / 100000)
      guests = []
    }
    guests.push(generate(i))
  }
  collection.createIndex({id: 1})
  clientConnect.close()
}
tenMilReview()
