const mongoose = require('mongoose')

const localMongoUri = 'mongodb://localhost/wdiToggleTimesheets'

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect(localMongoUri)
    .then(connection => console.log(`connection established to db ${connection.connections[0].name}`))
    .catch(error => console.log('Connection Failed!', error))
}

mongoose.Promise = Promise
module.exports = mongoose
