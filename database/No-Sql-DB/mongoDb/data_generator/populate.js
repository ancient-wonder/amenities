const faker = require('faker')
module.exports = idx => {
  return {
    _id: idx,
    user: {
      name: faker.name.lastName(),
      thumbnail: faker.internet.avatar(),
      link: faker.internet.url()
    },
    shipDetails: {
      name: faker.name.jobArea(),
      dock: faker.name.firstName(),
      capacity: faker.random.number(100),
      boatRules: [
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence()
      ],
      heads: faker.random.number(4),
      description: faker.lorem.sentence(),
      bedrooms: {
        capacity: faker.random.number(2),
        sleepingArrangement: [
          faker.random.number(4),
          faker.random.number(8),
          faker.random.number(9)
        ]
      },
      amenities: {
        priority: {
          anchor: true,
          engine: false,
          lifeJacket: true,
          twoWayRadio: true,
          soundSystem: true,
          tv: false,
          kitchen: false,
          ac: false,
          heating: true
        },
        optional: {
          inflatables: true,
          fishingGear: true,
          scubaGear: true,
          harpoons: true,
          sharkCage: true,
          medication: false,
          wifi: false,
          pool: true
        }
      }
    }
  }
}
