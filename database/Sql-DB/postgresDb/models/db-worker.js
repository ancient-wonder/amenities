const insertTable = require('./query/populate-sql-methods')
const pgp = require('pg-promise')()
const postTableInfo = require('./tableheader/postgresheader')
const populate = require('./populate-db')

const dbtables = pgp({
  database: 'amenity',
  port: 5432
})
// 37 minutes total for 7 table insertion

const batchInsert = async () => {
  for (let i = 1; i < 10000000; i += 100000) {
    await insertTable.insertIntoUniqueTable(
      dbtables,
      pgp,
      i,
      postTableInfo.amenityObj,
      populate.amenity
    )
    await insertTable.insertIntoGenericTable(
      dbtables,
      pgp,
      i,
      postTableInfo.user,
      populate.userobj
    )
    await insertTable.insertIntoGenericTable(
      dbtables,
      pgp,
      i,
      postTableInfo.shipdetail,
      populate.shipDetailObj
    )
    await insertTable.insertIntoGenericTable(
      dbtables,
      pgp,
      i,
      postTableInfo.bedrooms,
      populate.bedRoomObj
    )
    await insertTable.insertIntoGenericTable(
      dbtables,
      pgp,
      i,
      postTableInfo.optionaltable,
      populate.optionalObj
    )
    await insertTable.insertIntoGenericTable(
      dbtables,
      pgp,
      i,
      postTableInfo.prioritytable,
      populate.priorityObj
    )
  }
}
batchInsert()
