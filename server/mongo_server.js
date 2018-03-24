const MongoClient = require('mongodb').MongoClient

MongoClient.connect(`mongodb://localhost:${port}`, (err, db) => {
  try {
    db.collection()
  }
  catch (e) {

  }
})