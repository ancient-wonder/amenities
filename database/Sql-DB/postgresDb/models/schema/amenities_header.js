const shipHeader = {
  th: ['uniques'],
  tn: { table: 'ship' }
}

const usersHeader = {
  th: ['shipid', 'name', 'thumbnail', 'link'],
  tn: { table: 'users' }
}

const shipDetailHeader = {
  th: [
    'ownerid',
    'name',
    'dock',
    'capacity',
    'boatrules',
    'heads',
    'description',
    'bedroomcapacity',
    'bedroomsleepingarrangement',
    'anchorpriority',
    'enginepriority',
    'lifejacketpriority',
    'twowayradiopriority',
    'tvpriority',
    'kitchpriority',
    'acpriority',
    'heatingpriority',
    'inflatablesoptional',
    'fishinggearoptional',
    'scubagearoptional',
    'harpoonsoptional',
    'sharkcageoptional',
    'medicationoptional',
    'wifioptional',
    'pooloptional'
  ],
  tn: { table: 'shipdetail' }
}

module.exports = {
  shipHeader,
  usersHeader,
  shipDetailHeader
}