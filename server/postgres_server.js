const promise = require('bluebird')
const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
}

// loaderio-3813f083cbb17f0d520bd2e88a491d2d

const pg = require('pg-promise')(initOptions)
const connectionParams = {
  user: 'postgres',
  password: 'postgres',
  // host: '54.215.254.173',
  host: 'ec2-54-215-254-173.us-west-1.compute.amazonaws.com', // 'localhost' is the default;
  // host: 'localhost',
  port: 5432, // 5432 is the default;
  database: 'amenities'
}

const connectionString =
  'postgres://postgres:postgres@ec2-54-215-254-173.us-west-1.compute.amazonaws.com:5432/amenities'

const db = pg(connectionString)
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

const postgresData = async id => {
  const receivedData = await db.any(
    `select * from ship inner join shipdetail on ship.id = shipdetail.ownerid inner join users on shipdetail.ownerid = users.shipid where ship.id = ${id};`
  )
  const obj = await receivedData[0]
  return {
    id: {
      type: obj.id,
      unique: obj.uniques
    },
    user: {
      name: obj.username,
      thumbnail: obj.thumbnail,
      link: obj.link
    },
    shipDetails: {
      name: obj.shipname,
      dock: obj.dock,
      capacity: obj.capacity,
      boatRules: obj.boatrules,
      heads: obj.heads,
      description: obj.description,
      bedrooms: {
        capacity: obj.bedroomcapacity,
        sleepingArrangement: obj.bedroomsleepingarrangement
      },
      amenities: {
        priority: {
          anchor: obj.anchorpriority,
          engine: obj.enginepriority,
          lifeJacket: obj.lifejacketpriority,
          twoWayRadio: obj.twowayradiopriority,
          soundSystem: obj.soundsystempriority,
          tv: obj.tvpriority,
          kitchen: obj.kitchpriority,
          ac: obj.acpriority,
          heating: obj.heatingpriority
        },
        optional: {
          inflatables: obj.inflatablesoptional,
          fishingGear: obj.fishinggearoptional,
          scubaGear: obj.scubagearoptional,
          harpoons: obj.harpoonsoptional,
          sharkCage: obj.sharkcageoptional,
          medication: obj.medicationoptional,
          wifi: obj.wifioptional,
          pool: obj.pooloptional
        }
      }
    }
  }
}
module.exports = postgresData
