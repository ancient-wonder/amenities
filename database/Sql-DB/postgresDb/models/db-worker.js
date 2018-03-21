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
    await Promise.all([
      insertTable.insertIntoGenericTable(
        dbtables,
        pgp,
        i,
        postTableInfo.user,
        populate.userobj
      ),
      insertTable.insertIntoGenericTable(
        dbtables,
        pgp,
        i,
        postTableInfo.shipdetail,
        populate.shipDetailObj
      ),
      insertTable.insertIntoGenericTable(
        dbtables,
        pgp,
        i,
        postTableInfo.bedrooms,
        populate.bedRoomObj
      ),
      insertTable.insertIntoGenericTable(
        dbtables,
        pgp,
        i,
        postTableInfo.optionaltable,
        populate.optionalObj
      ),
      insertTable.insertIntoGenericTable(
        dbtables,
        pgp,
        i,
        postTableInfo.prioritytable,
        populate.priorityObj
      )
    ])
  }
}

const batchIndex = () => {
  dbtables
    .none(
      `
    CREATE INDEX id_index ON amenity (id) +
    CREATE INDEX user_id ON users (amenityid) +
    CREATE INDEX shipdetail_id ON shipdetail (amenityid) +
    CREATE INDEX bedrooms_id ON bedrooms (amenityid) +
    CREATE INDEX optionaltable_id ON optionaltable (amenityid) +
    CREATE INDEX prioritytable_id ON prioritytable (amenityid) +
  `
    )
    .then(() => console.log('created index'))
    .catch(e => console.log('failed ot create index'))
}
// batchIndex()
batchInsert()
