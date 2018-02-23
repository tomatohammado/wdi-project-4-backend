const express = require('express')
const Router = express.Router()

const timesheetController = require('../controller/timesheets')

Router.route('/duration/mvp-bonus')
  .get(timesheetController.getMvpBonusAllTasks)

module.exports = Router
