const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/User');

// contains all the middleware that passport need
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
      done(err, user);
    });
  });
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
          return done(null, user);
        });
      });
    },
  ));
};
