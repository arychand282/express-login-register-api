const passport = require('passport')
const passwortJwt = require('passport-jwt')
const ExtractJwt = passwortJwt.ExtractJwt
const StrategyJwt = passwortJwt.Strategy
const User = require('../models/user')

passport.use(
  new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, async (jwtPayload, done) => {
    return User.findOne({
      where: {
        id: jwtPayload.id
      }
    }).then((user) => {
      return done(null, user)
    }).catch((err) => {
      return done(err)
    })
  })
)