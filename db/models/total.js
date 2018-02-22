const mongoose = require('../connection')

const TotalSchema = new mongoose.Schema({
  task: String,
  duration: String,
  durationAsSeconds: Number
})

const Timesheet = mongoose.model('Total', TotalSchema)

module.exports = Timesheet
