const mongoose = require('../connection')

const TimesheetSchema = new mongoose.Schema({
  description: String,
  startDate: String,
  startTime: String,
  endDate: String,
  endTime: String,
  duration: String,
  tags: Array
})

const Timesheet = mongoose.model('Timesheet', TimesheetSchema)

module.exports = Timesheet
