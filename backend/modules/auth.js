/*
 * This middleware the users jwt is valid or not. 
 * If it's not valid returned from their if not go to the next function.
*/

const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  isLoggedIn: (req, res, next) => {
    const token = req.headers['authorization'].slice(7);
    jsonwebtoken.verify(token, 'secret', (err, decoded) => {
      if(decoded._doc._id) {
        next();
      } else {
        res.status(401).json({
          msg: 'Please log in again'
        })
      }
    });
  },
};
