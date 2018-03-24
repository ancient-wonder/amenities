const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost';
const dbName = 'amenities';


const randomInt = function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const mongoConnect = async function mongoConnect(){
  let client;
  try {
    client = await MongoClient.connect(url);

    let db = client.db(dbName);

    return db.collection('amenities'); //return connection object

  } catch (err) {
    console.log(err.stack);
  }

}

const mongooseConnect = async function mongooseConnect(){

  await mongoose.connect('mongodb://localhost/amenities');

}

const amenitiesSchema = mongoose.Schema({
  id: {
    type: Number,
    unique:true,
  },
  user: {
    name: String,
    thumbnail: String,
    link: String
  },
  shipDetails: {
    name: String,
    dock: String,
    capacity: Number,
    boatRules: [String],
    heads: Number,
    description: String,
    bedrooms: {
      capacity: Number,
      sleepingArrangement: [Number]
    },
    amenities: {
      priority: {
        anchor: Boolean,
        engine: Boolean,
        lifeJacket: Boolean,
        twoWayRadio: Boolean,
        soundSystem: Boolean,
        tv: Boolean,
        kitchen: Boolean,
        ac: Boolean,
        heating: Boolean
      },
      optional: {
        inflatables: Boolean,
        fishingGear: Boolean,
        scubaGear: Boolean,
        harpoons: Boolean,
        sharkCage: Boolean,
        medication: Boolean,
        wifi: Boolean,
        pool: Boolean
      }
    }
  },
  index: true
})

const findOneMongoose = async function findOneMongoose(){

  const Amenities = mongoose.model('Amenities', amenitiesSchema);

  const findOne = async function findOne(id) {
    return await Amenities.find({place_id: id}).limit(1);
  }

  let queryTimes = [];
 
  for (let i = 0; i < 2000; i++){
    //Benchmarking Tests

    const start = Date.now();

    const result = await findOne(randomInt(0,9999999));

    const end = Date.now();

    queryTimes.push(end-start);
    
  }

  console.log(`\nMongoose: Completed ${queryTimes.length} queries in an average of ${queryTimes.reduce((accumulator, currentValue) => accumulator + currentValue) / queryTimes.length} ms per query\n` );

   mongoose.disconnect();

}
