
// const pgp = require('pg-promise')()
// const insertIntoUniqueTable = (postgresTable, pgPromiseObj, start, tableInfo) => {
//   const data = []
//   for (let i = start; i < start + 100; i++) {
//     data.push(populate.amenity())
//   }
//   const columnHeader = new pgp.helpers.ColumnSet(tableInfo.th, tableInfo.tn)

//   const query = pgp.helpers.insert(data, columnHeader)

//   return dbtables
//     .none(query)
//     .then(data => console.log(`${tableInfo.tn.table} saved successfully`))
//     .catch(e => console.log(`${tableInfo.tn.table} FAILED to save T.T ${e}`))
// }
insertIntoGenericTable = (postgresTable, pgPromiseObj, start, tableInfo, populate) => {
  const data = []
  for (let i = start; i < start + 100; i++) {
    data.push(populate())
  }
  const columnHeader = new pgPromiseObj.helpers.ColumnSet(tableInfo.th, tableInfo.tn)

  const query = pgPromiseObj.helpers.insert(data, columnHeader)

  return postgresTable
    .none(query)
    .then(data => console.log(`${tableInfo.tn.table} saved successfully`))
    .catch(e => console.log(`${tableInfo.tn.table} FAILED to save T.T ${e}`))
}

module.exports = {
  insertIntoGenericTable: insertIntoGenericTable
}