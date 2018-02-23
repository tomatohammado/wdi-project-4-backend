const Timesheet = require('../db/models/timesheet')
const moment = require('moment')

// These should be in a separate Utility.js file or something to that effect

function convertSecondsToHHMMSS (durationSeconds) {
  let hours = Math.floor(durationSeconds / 3600)
  let hoursRemainder = durationSeconds % 3600

  let minutes = Math.floor(hoursRemainder / 60)
  let seconds = durationSeconds % 60

  return `${hours}:${minutes}:${seconds}`
}

function getTaskMvpBonus (timesheets, task, taskTag) {
  let filteredTimesheets = timesheets.filter(timesheet => (
    timesheet.tags.includes(taskTag)
  ))
  let mvpDuration = 0
  let bonusDuration = 0

  filteredTimesheets.forEach(timsheet => {
    if (timsheet.tags.includes('wdi-mvp')) {
      mvpDuration += moment.duration(timsheet.duration).asSeconds()
    }

    if (timsheet.tags.includes('wdi-bonus')) {
      bonusDuration += moment.duration(timsheet.duration).asSeconds()
    }
  })

  let mvpDurationFormatted = convertSecondsToHHMMSS(mvpDuration)
  let bonusDurationFormatted = convertSecondsToHHMMSS(bonusDuration)

  let output = {
    task: task,
    tag: taskTag,
    mvpDuration: mvpDuration,
    bonusDuration: bonusDuration,
    mvpDurationFormatted: mvpDurationFormatted,
    bonusDurationFormatted: bonusDurationFormatted
  }

  return output
}

// Controller Functions

function getMvpBonusAllTasks (req, res) {
  // Projects are conspicuously omitted, because I need to add a high-level 'wdi-project' tag to cover all of them, and that's something I should do in toggl itselg
  const tasksCollection = [
    {
      task: 'Class',
      taskTag: 'wdi-class'
    },
    {
      task: 'Homework',
      taskTag: 'wdi-hw'
    },
    {
      task: 'Labs',
      taskTag: 'wdi-lab'
    }
    // {
    //   task: 'Projects',
    //   taskTag: 'wdi-project'
    // }
  ]

  Timesheet.find({})
    .then(timesheets => {
      let output = []
      tasksCollection.forEach(taskObj => {
        let outputItem = getTaskMvpBonus(timesheets, taskObj.task, taskObj.taskTag)
        output.push(outputItem)
      })

      res.json(output)
    })
}

module.exports = {
  getMvpBonusAllTasks
}
