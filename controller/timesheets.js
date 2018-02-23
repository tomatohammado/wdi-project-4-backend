const Timesheet = require('../db/models/timesheet')

function getHomeworkMvp (req, res) {
  Timesheet.find({ tags: {$in: ['wdi-hw']} })
    .then(timesheets => {
      let filteredTimesheets = timesheets.filter(timesheet => (
        timesheet.tags.includes('wdi-mvp')
      ))
      res.json(filteredTimesheets)
    })
}

module.exports = {
  getHomeworkMvp
}
