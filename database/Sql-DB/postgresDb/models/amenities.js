const insertTable = require('./query/populate-sql-methods')
const pgp = require('pg-promise')()
const postTableInfo = require('./tableheader/postgresheader')
const populate = require('./populate-db')

const dbtables = pgp({
  database: 'amenity',
  port: 5432
})

const batchInsert = async () => {
  await insertTable.insertIntoGenericTable(
    dbtables,
    pgp,
    1,
    postTableInfo.amenityObj,
    populate.amenity
  )
  await insertTable.insertIntoGenericTable(
    dbtables,
    pgp,
    1,
    postTableInfo.user,
    populate.userobj
  )
}
batchInsert()

/* 
await insertTable.insertIntoGenericTable(
  dbtables,
  pgp,
  1,
  postTableInfo.shipdetail
)
await insertTable.insertIntoGenericTable(
  dbtables,
  pgp,
  1,
  postTableInfo.bedrooms
)
await insertTable.insertIntoGenericTable(
  dbtables,
  pgp,
  1,
  postTableInfo.optionaltable
)
await insertTable.insertIntoGenericTable(
  dbtables,
  pgp,
  1,
  postTableInfo.prioritytable
) */
