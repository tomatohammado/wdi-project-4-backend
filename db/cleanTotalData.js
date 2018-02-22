const fs = require('fs')
const moment = require('moment')

const totalClass = require('./dirtySeedData/total-class.json')
const totalHomework = require('./dirtySeedData/total-hw.json')
const totalLabs = require('./dirtySeedData/total-labs.json')
const totalProjects = require('./dirtySeedData/total-projects.json')
const totalOutcomes = require('./dirtySeedData/total-outcomes.json')
const totalMvp = require('./dirtySeedData/total-mvp.json')
const totalBonus = require('./dirtySeedData/total-bonus.json')
const totalsArray = [
  totalClass,
  totalHomework,
  totalLabs,
  totalProjects,
  totalOutcomes,
  totalMvp,
  totalBonus
]

let cleanedTotalData = totalsArray.map(total => {
  total.durationInSeconds = moment.duration(total.duration).asSeconds()
  return total
})

fs.writeFile('./db/totalSeedData.json', JSON.stringify(cleanedTotalData), 'utf8', err => {
  if (err) console.log(err)
  else console.log('success!!!')
})
