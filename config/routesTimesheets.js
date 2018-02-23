const express = require('express')
const Router = express.Router()

const timesheetController = require('../controller/timesheets')

Router.route('/homework/mvp')
  .get(timesheetController.getHomeworkMvp)

module.exports = Router
