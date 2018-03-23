require('newrelic')
const express = require('express')
// const mongoose = require('mongoose')
// const Amenities = require('../database/models/amenities')
const cors = require('cors')
const pgData = require('./postgres_server')
const app = express()
const port = 3001

// mongoose.connect('mongodb://localhost/amenities')
app.use(cors())
app.use('/amenities/:id', express.static(__dirname + '/../client'))
app.use(express.static(__dirname + '/../client'))

app.get('/amenities/:id/amenities/', (req, res) => {
  const { id } = req.params
  // Amenities.getAmenityById(id).then(result => res.json(result))
  try {
    pgData(id).then(result => res.json(result))
  } catch (e) {
    res.status(404).send('Invalid Parm')
  }
})

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})
