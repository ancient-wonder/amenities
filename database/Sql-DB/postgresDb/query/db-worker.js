const {
  insertIntoUniqueTable,
  insertIntoGenericTable
} = require('./populate-sql-methods')
const {
  createShipObj,
  createUserObj,
  createShipDetailsObj
} = require('./populate-db')
const {
  shipHeader,
  usersHeader,
  shipDetailHeader
} = require('../schema/amenities_header')
const pgp = require('pg-promise')()
const dbtables = pgp({
  database: 'amenities',
  port: 5432
})
// 37 minutes total for 7 table insertion

const batchInsert = async () => {
  for (let i = 1; i < 100000; i += 1000) {
    await insertIntoUniqueTable(dbtables, pgp, i, shipHeader, createShipObj)
    await Promise.all([
      insertIntoGenericTable(dbtables, pgp, i, usersHeader, createUserObj),
      insertIntoGenericTable(
        dbtables,
        pgp,
        i,
        shipDetailHeader,
        createShipDetailsObj
      )
    ])
  }
  dbtables
    .none(`CREATE INDEX user_idx ON users (shipid)`)
    .catch(e => console.log('failed to create index on user'))
  dbtables
    .none(`CREATE INDEX shipdetail_idx ON shipdetail (ownerid)`)
    .catch(e => console.log('failed to create idx on shipdetail'))
}
// batchIndex()
batchInsert()
