const generate = require('./populate.js')
// const db = require('./../models/amenities')
// const mongoose = require('mongoose')

const MongoClient = require('mongodb').MongoClient
const URL = 'mongodb://localhost:27017'



// mongoose.connect('mongodb://localhost/amenities')

const populateTwoK = async () => {
  const guest = []
  for (let i = 1; i < 10000; i++) {
    guest.push(generate(i))
  }
  return db.insertData(guest)
    .then(() => {
      console.log('saved 100 data')
    })
    .catch(e => console.log('failed to save'))
}

const insertTwentyThousand = async () => {
  await populateTwoK().then(data => {
    db.insertData(data).then(() => {
      tracker++
      if (tracker === 10) {
        mongoose.disconnect()
        console.log('finalized')
      }
      // mongoose.disconnect()

      console.log('inserted 100')
    })
  })
}

const inertThisMany = async () => {
  for (let i = 0; i < 1000; i++) {
    await populateTwoK()
  }
  mongoose.disconnect()
}

// inertThisMany()

// insertTwentyThousand()
// console.log(100 * 20000)

const tenMilReview = async () => {
  const clientConnect = await MongoClient.connect(URL)
  const mongoDb = clientConnect.db('amenities')
  const collection = mongoDb.collection('amenities')

  let guests = [];
  for (let i = 0; i <= 10000000; i++) {
    if (i !== 0 && i % 100000 === 0) {
      await collection.insertMany(guests)
      console.log('100000', i / 100000)
      guests = []
    }
    guests.push(generate(i))
  }
  clientConnect.close()
}

tenMilReview()


// for (let i = 0; i <= 10000000; i++) {
//   if (i !== 0 && i % 100000 === 0) {