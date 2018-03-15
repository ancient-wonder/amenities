const generate = require('./populate.js')
const db = require('./../models/amenities')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/amenities')

let tracker = 0
const delay = () => new Promise(resolve => setTimeout(resolve, 300))

const populateTwoK = async () => {
  const guest = []
  for (let i = 1; i < 100; i++) {
    guest.push(generate(i))
  }
  return db.insertData(guest)
    .then(() => console.log('saved 100 data'))
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

const checkToStop = () => {
  return Promise.resolve(tracker === 100)
}

const inertThisMany = async () => {
  for (let i = 0; i < 100; i++) {
    // console.time()
    await insertTwentyThousand()
  }
}

inertThisMany()

// insertTwentyThousand()
// console.log(100 * 20000)
