const fs = require('fs')
const dirtySeedData = require('./all-entries.json')

// description: String,
// startDate: String,
// startTime: String,
// endDate: String,
// endTime: String,
// duration: String,
// tags: Array

// let timesheet = dirtySeedData[0]
// let newTimesheet = {}
// newTimesheet.description = timesheet.Description
// newTimesheet.startDate = timesheet['Start date']
// newTimesheet.startTime = timesheet['Start time']
// newTimesheet.endDate = timesheet['End date']
// newTimesheet.endTime = timesheet['End time']
// newTimesheet.duraction = timesheet.Duration
// newTimesheet.tags = timesheet.Tags.split(',').map(tag => (tag.trim()))
// console.log(newTimesheet)

let cleanedSeedData = dirtySeedData.map(timesheet => {
  let newTimesheet = {}
  newTimesheet.description = timesheet.Description
  newTimesheet.startDate = timesheet['Start date']
  newTimesheet.startTime = timesheet['Start time']
  newTimesheet.endDate = timesheet['End date']
  newTimesheet.endTime = timesheet['End time']
  newTimesheet.duraction = timesheet.Duration
  newTimesheet.tags = timesheet.Tags.split(',').map(tag => (tag.trim()))
  return newTimesheet
})

fs.writeFile('./db/seedData.json', JSON.stringify(cleanedSeedData), 'utf8', err => {
  if (err) console.log(err)
  else console.log('success!!!')
})
