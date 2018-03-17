module.exports = {
  amenityObj: { th: ['uniques'], tn: { table: 'amenity' } },
  user: {
    th: ['amenityid', 'name', 'thumbnail', 'link'],
    tn: { table: '_user' }
  },
  shipdetail: {
    th: ['amenityid', 'name', 'dock', 'capacity', 'boatrules', 'description'],
    tn: { table: 'shipdetail' }
  },
  bedrooms: {
    th: ['amenityid', 'capacity', 'sleepingarrangement'],
    tn: { table: 'bedrooms' }
  },
  optionaltable: {
    th: [
      'amenityid',
      'inflatables',
      'fishinggear',
      'scubagear',
      'harpoons',
      'sharkcage',
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
      'lifejacket',
      'twowayradio',
      'tv',
      'kitchen',
      'ac',
      'heating'
    ],
    tn: { table: 'prioritytable' }
  },
  client: { th: ['amenityid', 'name'], tn: { table: 'client' } }
}
