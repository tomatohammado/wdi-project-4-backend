const express = require('express')
// require routes here
const parser = require('body-parser')

const app = express()

app.set('port', process.env.PORT || 4000)

app.use(parser.json())

// use routes here

app.listen(app.get('port'), () => {
  console.log('Listening on port 4000 (locally)')
})
