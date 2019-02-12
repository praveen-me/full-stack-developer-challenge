const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/User');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// contains all the middleware that passport need
module.exports = (passport) => {
  /*
   * passport local strategy takes username and password
   * compare with the user's document in db
  */
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false);
        }
        return user.verifyPassword(password, (err, isMatched) => {
          if (!isMatched) {
            return done(null, false);
          }
          User.findOne({_id : user._id}, {password : 0}, (err, userData) => {
            return done(null, userData);
          })
        });
      });
    },
  ));
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'secret'
  },
  function (jwtPayload, cb) {
      console.log(jwtPayload, 'payload')
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return UserModel.findOneById(jwtPayload.id)
          .then(user => {
              return cb(null, user);
          })
          .catch(err => {
              return cb(err);
          });
  }
  ));
};
