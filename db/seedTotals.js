const Total = require('./models/total')
const seedData = require('./totalSeedData.json')

Total
  .remove({})
  .then(_ => {
    console.log('Dropped the Total Collection...')
    Total.collection.insert(seedData)
    .then(seededData => {
      console.log('Total data seeded. Exiting...')
      process.exit()
    })
  })
