/*  using mongoose 
const mongoose = require('mongoose')
const Amenities = require('../database/models/amenities')
mongoose.connect('mongodb://localhost/amenities') */
require('newrelic')
const cluster = require('cluster')
const express = require('express')
const cors = require('cors')
const pgData = require('./postgres_server')
const redis = require('redis')
const app = express()
const port = process.env.PORT || 3001
const client = redis.createClient(6379)
const cache = require('./redis_cache')

app.use(cors())
app.use('/amenities/:id', express.static(__dirname + '/../client'))
app.use(express.static(__dirname + '/../client'))


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
