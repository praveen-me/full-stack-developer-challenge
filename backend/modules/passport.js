const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/User');

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
          console.log(isMatched)
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
};
