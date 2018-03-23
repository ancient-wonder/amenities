require('newrelic')
const express = require('express')
// const mongoose = require('mongoose')
// const Amenities = require('../database/models/amenities')
const cors = require('cors')
const pgData = require('./postgres_server')
const redis = require('redis')
const app = express()
const port = process.env.PORT || 3001
const client = redis.createClient(6379)

// mongoose.connect('mongodb://localhost/amenities')
app.use(cors())
app.use('/amenities/:id', express.static(__dirname + '/../client'))
app.use(express.static(__dirname + '/../client'))

const cache = (request, response, next) => {
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

// for postgres use
app.get('/amenities/:id/amenities/', cache, async (req, res) => {
  const { id } = req.params
  // Amenities.getAmenityById(id).then(result => res.json(result))
  try {
    const amenities = await pgData(id)
    client.setex(req.params.id, 300, JSON.stringify(amenities))
    res.json(amenities)
  } catch (e) {
    res.status(500).send('Invalid Parm')
  }
})

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})
