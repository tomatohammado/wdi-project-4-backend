const express = require('express')
const routesTimesheets = require('./config/routesTimesheets')
const parser = require('body-parser')

const app = express()

app.set('port', process.env.PORT || 4000)

app.use(parser.json())

app.use(routesTimesheets)

app.listen(app.get('port'), () => {
  console.log('Listening on port 4000 (locally)')
})
