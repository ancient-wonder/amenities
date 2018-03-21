const {
  insertIntoUniqueTable,
  insertIntoGenericTable
} = require('./query/populate-sql-methods')
const {
  createShipObj,
  createUserObj,
  createShipDetailsObj
} = require('./populate-db')
const {
  shipHeader,
  usersHeader,
  shipDetailHeader
} = require('./schema/amenities_header')
const pgp = require('pg-promise')()
const dbtables = pgp({
  database: 'amenities',
  port: 5432
})
// 37 minutes total for 7 table insertion

const batchInsert = async () => {
  for (let i = 1; i < 10000; i += 1000) {
    await insertIntoUniqueTable(dbtables, pgp, i, shipHeader, createShipObj)
    await Promise.all([
      insertIntoGenericTable(dbtables, pgp, i, usersHeader, createUserObj),
      insertIntoGenericTable(dbtables, pgp, i, shipDetailHeader, createShipDetailsObj)
    ])
  }
}
// batchIndex()
batchInsert()
