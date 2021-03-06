const shipHeader = {
  th: ['uniques'],
  tn: { table: 'ship' }
}

const usersHeader = {
  th: ['shipid', 'username', 'thumbnail', 'link'],
  tn: { table: 'users' }
}

const shipDetailHeader = {
  th: [
    'ownerid',
    'shipname',
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
    'soundsystempriority',
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