
const pgp = require('pg-promise')()
const insertIntoUniqueTable = (postgresTable, pgPromiseObj, start, incrementer, tableInfo, populate) => {
  const data = []
  for (let i = start; i < start + incrementer; i++) {
    data.push(populate())
  }
  const columnHeader = new pgPromiseObj.helpers.ColumnSet(tableInfo.th, tableInfo.tn)

  const query = pgPromiseObj.helpers.insert(data, columnHeader)

  return postgresTable
    .none(query)
    .then(data => console.log(`${tableInfo.tn.table} saved successfully`))
    .catch(e => console.log(`${tableInfo.tn.table} FAILED to save T.T ${e}`))
}
insertIntoGenericTable = (postgresTable, pgPromiseObj, start, incrementer, tableInfo, populate) => {
  const data = []
  for (let i = start; i < start + incrementer; i++) {
    data.push(populate(i))
  }
  const columnHeader = new pgPromiseObj.helpers.ColumnSet(tableInfo.th, tableInfo.tn)

  const query = pgPromiseObj.helpers.insert(data, columnHeader)

  return postgresTable
    .none(query)
    .then(data => console.log(`${tableInfo.tn.table} ${Math.ceil(start / incrementer)} saved successfully`))
    .catch(e => console.log(`${tableInfo.tn.table} FAILED to save T.T ${e}`))
}

module.exports = {
  insertIntoUniqueTable,
  insertIntoGenericTable
}