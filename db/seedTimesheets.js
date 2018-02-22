const Timesheet = require('./models/timesheet')
const seedData = require('./timesheetSeedData.json')

Timesheet
  .remove({})
  .then(_ => {
    console.log('Dropped the DB')
    Timesheet.collection.insert(seedData)
    .then(seededData => {
      console.log('Timesheet data seeded. Exitting...')
      process.exit()
    })
  })
