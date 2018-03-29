
const pgp = require('pg-promise')()
const insertIntoUniqueTable = (postgresTable, pgPromiseObj, start, tableInfo, populate) => {
  const data = []
  for (let i = start; i < start + 1000; i++) {
    data.push(populate())
  }
  const columnHeader = new pgPromiseObj.helpers.ColumnSet(tableInfo.th, tableInfo.tn)

  const query = pgPromiseObj.helpers.insert(data, columnHeader)

  return postgresTable
    .none(query)
    .then(data => console.log(`${tableInfo.tn.table} saved successfully`))
    .catch(e => console.log(`${tableInfo.tn.table} FAILED to save T.T ${e}`))
}
insertIntoGenericTable = (postgresTable, pgPromiseObj, start, tableInfo, populate) => {
  const data = []
  for (let i = start; i < start + 1000; i++) {
    data.push(populate(i))
  }
  const columnHeader = new pgPromiseObj.helpers.ColumnSet(tableInfo.th, tableInfo.tn)

  const query = pgPromiseObj.helpers.insert(data, columnHeader)

  return postgresTable
    .none(query)
    .then(data => console.log(`${tableInfo.tn.table} ${Math.ceil(start / 100000)} saved successfully`))
    .catch(e => console.log(`${tableInfo.tn.table} FAILED to save T.T ${e}`))
}

module.exports = {
  insertIntoUniqueTable,
  insertIntoGenericTable
}