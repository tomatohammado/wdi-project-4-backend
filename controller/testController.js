const Timesheet = require('../db/models/timesheet')
const moment = require('moment')

function getHomeworkMvpBonusDurations (req, res) {
  Timesheet
    .find({})
    .then(timesheets => {
      let output = getTaskMvpBonus(timesheets, 'Homework', 'wdi-hw')
      console.log(output)
    })
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

  // console.log(mvpDuration)
  // console.log(bonusDuration)
  // console.log(mvpDurationFormatted)
  // console.log(bonusDurationFormatted)

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

function convertSecondsToHHMMSS (durationSeconds) {
  let hours = Math.floor(durationSeconds / 3600)
  let hoursRemainder = durationSeconds % 3600

  let minutes = Math.floor(hoursRemainder / 60)
  let seconds = durationSeconds % 60

  return `${hours}:${minutes}:${seconds}`
}

// console.log(convertSecondsToHHMMSS(167019))
// console.log('should be: 46:23:39')

// getTaskMvpBonus('Homework', 'wdi-hw')

getHomeworkMvpBonusDurations()
