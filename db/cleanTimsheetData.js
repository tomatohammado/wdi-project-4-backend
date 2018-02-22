const fs = require('fs')
const dirtySeedData = require('./all-timesheet-entries.json')

let cleanedSeedData = dirtySeedData.map(timesheet => {
  let newTimesheet = {}
  newTimesheet.description = timesheet.Description
  newTimesheet.startDate = timesheet['Start date']
  newTimesheet.startTime = timesheet['Start time']
  newTimesheet.endDate = timesheet['End date']
  newTimesheet.endTime = timesheet['End time']
  newTimesheet.duration = timesheet.Duration
  newTimesheet.tags = timesheet.Tags.split(',').map(tag => (tag.trim()))
  return newTimesheet
})

fs.writeFile('./db/timesheetSeedData.json', JSON.stringify(cleanedSeedData), 'utf8', err => {
  if (err) console.log(err)
  else console.log('success!!!')
})
