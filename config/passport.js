const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY
const users = require('../model/user')

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async function (payload, done) {
    try {
      const user = await users.getUsersById(payload.id)
      if (!user) {
        return done(new Error('Not authorized'))
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      done(err)
    }
  })
)
