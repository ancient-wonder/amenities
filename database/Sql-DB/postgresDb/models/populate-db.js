/* 
  helper to generate N numbers of fake data
*/

const faker = require('faker')

const amenityObj = () => {
  return {
    uniques: faker.random.boolean()
  }
}

const userObj = (idx) => {
  return {
    amenityid: idx,
    name: faker.name.lastName(),
    thumbnail: faker.internet.avatar(),
    link: faker.internet.url()
  }
}

const shipDetailObj = () => {
  return {
    name: faker.name.jobArea(),
    dock: faker.name.firstName(),
    capacity: faker.random.number(100),
    boatRules: [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence()
    ],
    heads: faker.random.number(4),
    description: faker.lorem.sentence()
  }
}

const bedRoomObj = () => {
  return {
    capacity: faker.random.number(2),
    sleepingArrangement: [
      faker.random.number(4),
      faker.random.number(8),
      faker.random.number(9)
    ]
  }
}

const priorityObj = () => {
  return {
    anchor: faker.random.boolean(),
    engine: faker.random.boolean(),
    lifeJacket: faker.random.boolean(),
    twoWayRadio: faker.random.boolean(),
    soundSystem: faker.random.boolean(),
    tv: faker.random.boolean(),
    kitchen: faker.random.boolean(),
    ac: faker.random.boolean(),
    heating: faker.random.boolean()
  }
}

const optionalObj = () => {
  return {
    inflatables: faker.random.boolean(),
    fishingGear: faker.random.boolean(),
    scubaGear: faker.random.boolean(),
    harpoons: faker.random.boolean(),
    sharkCage: faker.random.boolean(),
    medication: faker.random.boolean(),
    wifi: faker.random.boolean(),
    pool: faker.random.boolean()
  }
}

module.exports = {
  amenity: amenityObj,
  userobj: userObj,
  shipDetailObj: shipDetailObj,
  bedRoomObj: bedRoomObj,
  priorityObj: priorityObj,
  optionalObj: optionalObj
}
