const Timesheet = require('../db/models/timesheet')

function getWeeklyDurations (req, res) {
  Timesheet.find({})
    .then(timesheets => {
      function getDurationByTag (taskTag, weekTag) {
        timesheets.reduce((duration, timesheet) => {
          if (timesheet.tags.includes(taskTag) && timesheet.tags.includes(weekTag)) {
            duration += timesheet.duration
          }
          return duration
        }, 0)
      }

      let projectTags = [
        'wdi-project-1',
        'wdi-project-2',
        'wdi-project-3',
        'wdi-project-4'
      ]
      let timesheetsOutput = []

      for (let i = 1; i <= 12; i++) {
        let outputObject = {}
        let weekTag = `wdi-week-${i}`
        outputObject.week = `Week ${i}`
        outputObject.classDuration = getDurationByTag('wdi-class', weekTag)
        outputObject.homeworkDuration = getDurationByTag('wdi-hw', weekTag)
        outputObject.labsDuration = getDurationByTag('wdi-labs', weekTag)
        let projectDurationTotal = projectTags.map(projectTag => {
          return getDurationByTag(projectTag, weekTag)
        }).reduce((duration, projectDuration) => {
          return duration + projectDuration
        }, 0)
        outputObject.projectDuration = projectDurationTotal
        timesheets.push(outputObject)
      }

      res.json(timesheetsOutput)
    })
}

module.exports = {
  getWeeklyDurations
}
