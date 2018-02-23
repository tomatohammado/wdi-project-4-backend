const Timesheet = require('../db/models/timesheet')
const moment = require('moment')

// function getWeeklyDurations (req, res) {
//   Timesheet
//     .find({})
//     .then(timesheets => {
//       let filteredTimesheets = timesheets.filter(timesheet => {
//         return timesheet.tags.includes('wdi-week-1')
//       })
//       // console.log(filteredTimesheets)
//       let weekOneOutput = {
//         week: 'Week 1',
//         classDuration: 0,
//         homeworkDuration: 0,
//         labsDuration: 0,
//         projectDuration: 0
//       }
//       filteredTimesheets.forEach(timesheet => {
//         switch (true) {
//           case timesheet.tags.includes('wdi-class'):
//             weekOneOutput.classDuration += moment.duration(timesheet.duration).asSeconds()
//             break
//           case timesheet.tags.includes('wdi-hw'):
//             weekOneOutput.homeworkDuration += moment.duration(timesheet.duration).asSeconds()
//             break
//           case timesheet.tags.includes('wdi-lab'):
//             weekOneOutput.labsDuration += moment.duration(timesheet.duration).asSeconds()
//             break
//           case timesheet.tags.includes('wdi-project-1', 'wdi-project-2', 'wdi-project-3', 'wdi-project-4'):
//             weekOneOutput.projectDuration += moment.duration(timesheet.duration).asSeconds()
//             break
//           default:
//             console.log('did not match class, hw, lab, or project')
//             console.log(timesheet)
//         }
//       })

//       weekOneOutput.classDuration = moment.duration(weekOneOutput.classDuration, 'seconds').format('hh:mm:ss')
//       console.log(weekOneOutput.classDuration)
//     })
// }

// getWeeklyDurations()

function getTaskMvpBonus (task, taskTag) {
  Timesheet
    .find({ tags: {$in: [taskTag]} })
    .then(timesheets => {
      let mvpDuration = 0
      let bonusDuration = 0

      timesheets.forEach(timsheet => {
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

      console.log(output)
    })
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

getTaskMvpBonus('Homework', 'wdi-hw')
