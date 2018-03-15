const generate = require('./populate.js')
const db = require('./../models/amenities')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/amenities')

// const insert = () => {
//   return new Promise(resolve => setTimeout(resolve, 300))
// }

// const generateOne = async idx => {
//   await insert()
//   generate(idx)
// }
// await
let tracker = 0
const delay = () => new Promise(resolve => setTimeout(resolve, 300))

const populateTwoK = async () => {
  const guest = []
  for (let i = 1; i < 100000; i++) {
    // await delay
    console.time()
    guest.push(generate(i))
  }
  return Promise.resolve(guest)
  // return new Promise(resolve =>
  //   setTimeout(() => {
  //     resolve()
  //   })
  // )
}

const insertTwentyThousand = async () => {
  await populateTwoK().then(data => {
    db.insertData(data).then(() => {
      // console.log(tracker++)
      // if (tracker === 10) {
      //   mongoose.disconnect()
      //   console.timeEnd()
      // }
      mongoose.disconnect()
      console.timeEnd()
    })
  })
}

const checkToStop = () => {
  return Promise.resolve(tracker === 100)
}

// const inertThisMany = async () => {
//   for (let i = 0; i < 10; i++) {
//     console.time()
//     await insertTwentyThousand()
//   }
// }

// inertThisMany()
insertTwentyThousand()
// console.log(100 * 20000)
