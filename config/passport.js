const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtkey;

module.exports = passport => {
	console.log("good")
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload)
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
          	console.log("user")
            return done(null, user);
          }
          console.log("rajat")
          return done(null, false);

        })
        .catch(err => console.log(err));
    })
  );
};