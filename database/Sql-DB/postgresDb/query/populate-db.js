/* 
  helper to generate N numbers of fake data
*/

const faker = require('faker')

const createShipObj = () => {
  return {
    uniques: faker.random.boolean()
  }
}

const createUserObj = id => {
  return {
    shipid: id,
    username: faker.name.lastName(),
    thumbnail: faker.internet.avatar(),
    link: faker.internet.url()
  }
}

const createShipDetailsObj = id => {
  return {
    ownerid: id,
    shipname: faker.name.jobArea(),
    dock: faker.name.firstName(),
    capacity: faker.random.number(100),
    boatrules: [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence()
    ],
    heads: faker.random.number(4),
    description: faker.lorem.sentence(),
    bedroomcapacity: faker.random.number(2),
    bedroomsleepingarrangement: [
      faker.random.number(4),
      faker.random.number(8),
      faker.random.number(9)
    ],
    anchorpriority: faker.random.boolean(),
    enginepriority: faker.random.boolean(),
    lifejacketpriority: faker.random.boolean(),
    twowayradiopriority: faker.random.boolean(),
    soundsystempriority: faker.random.boolean(),
    tvpriority: faker.random.boolean(),
    kitchpriority: faker.random.boolean(),
    acpriority: faker.random.boolean(),
    heatingpriority: faker.random.boolean(),
    inflatablesoptional: faker.random.boolean(),
    fishinggearoptional: faker.random.boolean(),
    scubagearoptional: faker.random.boolean(),
    harpoonsoptional: faker.random.boolean(),
    sharkcageoptional: faker.random.boolean(),
    medicationoptional: faker.random.boolean(),
    wifioptional: faker.random.boolean(),
    pooloptional: faker.random.boolean()
  }
}
module.exports = {
  createShipObj,
  createUserObj,
  createShipDetailsObj
}
