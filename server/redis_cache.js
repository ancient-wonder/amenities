

module.exports.cache = (request, response, next) => {
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

// module.exports = cache
