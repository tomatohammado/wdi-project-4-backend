const fs = require('fs')
const dirtySeedData = require('./dirtySeedData/all-timesheet-entries.json')

let cleanedTimesheetData = dirtySeedData.map(timesheet => {
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

fs.writeFile('./db/timesheetSeedData.json', JSON.stringify(cleanedTimesheetData), 'utf8', err => {
  if (err) console.log(err)
  else console.log('success!!!')
})
