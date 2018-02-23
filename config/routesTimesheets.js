const express = require('express')
const Router = express.Router()

const timesheetController = require('../controller/timesheets')

Router.route('/weekly/durations')
  .get(timesheetController.getWeeklyDurations)

module.exports = Router
