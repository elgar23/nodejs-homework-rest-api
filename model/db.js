const mongoose = require('mongoose')
require('dotenv').config()

const db = mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected ')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and app terminated')
    process.exit(1)
  })
})

module.exports = db
