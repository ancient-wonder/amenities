const pgp = require('pg-promise')()

const populate = require('./populate-db')
// const dataSize = 10000000

const dbtables = pgp({
  database: 'amenity',
  port: 5432
})

const createAmenity = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push(populate.amenity())
  }
  const columnHeader = new pgp.helpers.ColumnSet(['uniques'], {
    table: 'amenity'
  })

  const query = pgp.helpers.insert(data, columnHeader)

  return dbtables
    .none(query)
    .then(data => console.log('amenity saved'))
    .catch(e => console.log('failed to save to amenity T/T.T/T', e))
}

const createUser = () => {
  const data = []
  for (let i = 1; i <= 100; i++) {
    data.push(populate.userobj(i))
  }
  const columnHeader = new pgp.helpers.ColumnSet(
    ['amenityid', 'name', 'thumbnail', 'link'],
    { table: '_user' }
  )
  const query = pgp.helpers.insert(data, columnHeader)
  return dbtables
    .none(query)
    .then(data => console.log('user saved'))
    .catch(e => console.log('failed to save to amenity T/T.T/T', e))
}

const batchInsert = async () => {
  createAmenity()
    .then(() => createUser())
    .catch(e => 'failed to save amenity')
}
batchInsert()
