require('newrelic')
const express = require('express')
const cors = require('cors')
// const pgData = require('./postgres_server')
const redis = require('redis')
const app = express()
const port = process.env.PORT || 3001
const client = redis.createClient()

const promise = require('bluebird')
const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
}

// loaderio-3813f083cbb17f0d520bd2e88a491d2d

const pg = require('pg-promise')(initOptions)
const connectionParams = {
  user: 'postgres',
  password: 'postgres',
  host: 'ec2-54-215-254-173.us-west-1.compute.amazonaws.com', // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: 'amenities'
}
const db = pg(connectionParams)
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

app.use(cors())
app.use('/amenities/:id', express.static(__dirname + '/../client/dist'))
app.use(express.static(__dirname + '/../client/dist'))

cache = (request, response, next) => {
  const id = request.params.id
  client.get(id, (error, data) => {
    if (error) {
      throw error
    }
    if (data !== null) {
      const result = JSON.parse(data)
      response.send(result)
    } else {
      next()
    }
  })
}

app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  next()
})

app.get('/test', (req, res) => {
  res.send('hello world')
})

app.get('/test2', (req, res) => {
res.send('derp')
})

app.get('/amenities/:id/amenities/', cache, async (req, res) => {
  const { id } = req.params
  console.log('hello world')
 // Amenities.getAmenityById(id).then(result => res.json(result))
  try {
    const amenities = await postgresData(id)
    console.log(amenities)
    client.setex(req.params.id, 300, JSON.stringify(amenities))
    res.json(amenities)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})
