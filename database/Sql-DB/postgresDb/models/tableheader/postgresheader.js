module.exports = {
  user: ['amenityid', 'name', 'thumbnail', 'link'],
  shipdetail: [
    'amenityid',
    'name',
    'dock',
    'capacity',
    'boatRules',
    'description'
  ],
  bedrooms: ['amenityid', 'capacity', 'sleepingArrangement'],
  optionaltable: [
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
  prioritytable: [
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
  client: ['amenityid', 'name']
}
