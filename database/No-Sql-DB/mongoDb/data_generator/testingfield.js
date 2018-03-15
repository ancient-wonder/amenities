const generate = require('./populate.js')
const MongoClient = require('mongodb').MongoClient
const URL = 'mongodb://localhost:27017'

const tenMilReview = async () => {
  const clientConnect = await MongoClient.connect(URL)
  const mongoDb = clientConnect.db('amenities')
  const collection = mongoDb.collection('amenities')

  let guests = [];
  for (let i = 0; i <= 1000000; i++) {
    if (i !== 0 && i % 1000 === 0) {
      await collection.insertMany(guests)
      console.log('1000', i / 1000)
      guests = []
    }
    guests.push(generate(i))
  }
  clientConnect.close()
}
tenMilReview()
