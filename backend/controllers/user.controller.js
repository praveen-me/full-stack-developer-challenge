const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./../models/User');

module.exports = {
  signUp: (req, res) => {
    const user = req.body;

    const newUser = new User({
      ...user,
    });

    User.findOne({ username: user.username }, (err, data) => {
      if (data) {
        return res.status(302).json({
          msg: 'username is not available',
        });
      }
      newUser.save((err, data) => {
        if (err) {
          return res.json({
            msg: 'Problem in saving your data. Please try again.',
          });
        }
        return res.status(201).json({
          msg: 'Sign Up Successfully',
        });
      });
    });
  },
  logIn: (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(404).json({
          msg: 'Invalid user creadentials. Please try again.',
        });
      }
      return req.logIn(user, (err) => {
        if (err) { return next(err); }
        return User.findOne({_id: user._id}, { password: 0 }, (err, data) => {
          if (err) throw err;
          return res.json({
            data,
          });
        });
      });
    })(req, res, next);
  },
  isLoggedIn: (req, res) => {
    if (req.user) {
      return User.findOne({ _id: req.user._id }, { password: 0 }, (err, data) => {
        if (err) throw err;
        return res.json({
          data,
        });
      });
    }
    return res.status(401).json({
      msg: 'Please login to get your details.',
    });
  },
  logout: (req, res) => {
    req.logOut();
    return res.status(200).json({
      msg: 'Logout Completed',
    });
  },
};
