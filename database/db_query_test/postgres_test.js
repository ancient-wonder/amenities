const promise = require('bluebird')

const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
}

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const postgres = require('pg-promise')(initOptions)

const connectionParams = {
  host: 'localhost', // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: 'amenities',
}

const db = postgres(connectionParams) // database instance;

const postgresQuery = async function postgresQuery() {
  try {
    let queryTimes = []

    for (let i = 0; i < 2000; i++) {
      const start = Date.now()
      const users = await db.any(
        `select * from ship join shipdetail on ship.id = shipdetail.ownerid join users on shipdetail.ownerid = users.shipid where ship.id = ${randomInt(1, 9999999)};`
      )
      const end = Date.now()
      queryTimes.push(end - start)
    }

    console.log(
      `\nPostgresDB: Completed 2000 Queries with an average time of ${queryTimes.reduce(
        (accum, curr) => accum + curr
      ) / queryTimes.length}ms per query\n`
    )

    db.$pool.end()
  } catch (e) {
    console.log('Oops! There was an error querying the database!')
  }
}

postgresQuery()
