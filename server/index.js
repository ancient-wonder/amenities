const cluster = require('cluster')

require('newrelic')

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

// using cluster

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork()
  }

  // Listen for dying workers
  cluster.on('exit', function(worker) {
    // Replace the dead worker, we're not sentimental
    console.log('Worker %d died :(', worker.id)
    cluster.fork()
  })
} else {
  const express = require('express')
  const cors = require('cors')
  const pgData = require('./postgres_server')
  const redis = require('redis')
  const app = express()
  const port = process.env.PORT || 3001
  const client = redis.createClient(6379)

  app.use(cors())
  app.use('/amenities/:id', express.static(__dirname + '/../client'))
  app.use(express.static(__dirname + '/../client'))

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
}
