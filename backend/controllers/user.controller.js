const passport = require('passport');
const User = require('./../models/User');
const jsonwebtoken = require('jsonwebtoken');

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
      if (!user || err) {
        return res.status(401).json({
          msg: 'Invalid user credentials. Please try again.',
        });
      }
      return req.logIn(user, {session : false}, (err) => {
        if (err) { return next(err); }
        return res.status(200).json({
          user,
          token: jsonwebtoken.sign({...user}, 'secret')
        });
      });
    })(req, res, next);
  },
  isLoggedIn: (req, res) => {
    const {token} = req.params;
    
    jsonwebtoken.verify(token, 'secret', (err, decoded) => {
      if(err) throw err;
      return res.status(200).json({
        user: decoded._doc,
        token
      })
    })
  },
  logout: (req, res) => {
    req.logOut();
    return res.status(200).json({
      msg: 'Logout Completed',
    });
  },
};
