const pgp = require('pg-promise')()

// const populate = require('./populate-db')
// const dataSize = 10000000

const dbtables = pgp({
  database: 'amenity',
  port: 5432
})

const createRandomTable = () => {
  dbtables
    .none(
      'CREATE TABLE amenity (id INTEGER DEFAULT 1 PRIMARY KEY,' +
        'user text,' +
        'breed VARCHAR,' +
        'user FOREIGN KEY REFERENCES userTable(id));'
    )
    .then(data => console.log('random created'))
    .then(async () => {
      await dbtables
        .none(
          'INSERT INTO amenity (name, breed, age, sex)' +
            'VALUES' +
            "('Tyler', 'Retrieved', 3, 'M');"
        )
        .then(() => console.log('inserted into table random'))
        .catch( e => console.log('failed again', e))
    })
    .catch(e => console.log('failed to save', e))
}

const createDB = () => {
  db
    .none('CREATE DATABASE puppies')
    .then(data => console.log('something else happened'))
    .then(() => createRandomTable())
    .catch(error => console.log('failed to save', error))
}
createDB()
// const createAmenity = () => {
//   dbtables
//     .none()
//     .then(data => console.log('saved to postgres'))
//     .then(() => createRandomTable())
//     // .then(() => createShipDetails())
//     .catch(e => 'failed to save to postgres')
// }
// const createUserTable = () => {
//   dbtables
//     .none(
//       'CREATE TABLE user(' +
//         'id SERIAL PRIMARY KEY,' +
//         'name TEXT,' +
//         'thumbnail TEXT,' +
//         'link TEXT'
//     )
//     .then(data => {
//       console.log('similarlist table successfully created')
//     })
//     .catch(error => {
//       console.log('something went wrong')
//     })
// }
// const createShipDetails = () => {
//   dbtables
//     .none(
//       'CREATE TABLE shipDetails(' +
//         'id SERIAL PRIMARY KEY,' +
//         'name TEXT,' +
//         'dock TEXT,' +
//         'capacity SMALLINT,' +
//         'boatRules STRING [],' +
//         'heads SMALLINT,' +
//         'description TEXT'
//     )
//     .then(data => console.log('ship details created'))
//     .catch(e => console.log("couldn't save ship", e))
// }
