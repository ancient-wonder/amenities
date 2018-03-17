module.exports = {
  amenityObj: { th: ['uniques'], tn: { table: 'amenity' } },
  user: {
    th: ['amenityid', 'name', 'thumbnail', 'link'],
    tn: { table: '_user' }
  },
  shipdetail: {
    th: ['amenityid', 'name', 'dock', 'capacity', 'boatRules', 'description'],
    tn: { table: 'shipDetail' }
  },
  bedrooms: {
    th: ['amenityid', 'capacity', 'sleepingArrangement'],
    tn: { table: 'bedrooms' }
  },
  optionaltable: {
    th: [
      'amenityid',
      'inflatables',
      'fishingGear',
      'scubaGear',
      'harpoons',
      'sharkCage',
      'medication',
      'wifi',
      'pool'
    ],
    tn: { table: 'optionaltable' }
  },
  prioritytable: {
    th: [
      'amenityid',
      'anchor',
      'engine',
      'lifeJacket',
      'twoWayRadio',
      'tv',
      'kitchen',
      'ac',
      'heating'
    ],
    tn: { table: 'prioritytable' }
  },
  client: { th: ['amenityid', 'name'], tn: { table: 'client' } }
}
