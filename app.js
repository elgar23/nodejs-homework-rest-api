const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const contactsRouter = require('./routes/api/contacts')
const userRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const limiter = rateLimit({
  windowMs: 900000,
  max: 100,
})

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 50000 }))

app.use('/api/', limiter)
app.use('/api/users', userRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
