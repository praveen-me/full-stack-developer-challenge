/*
 * This middleware the checks wheather the user session is
 * expired or not. If expired returned from their
 * if not go to the next function.
*/

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        msg: 'You are not loggedIn. Please Log In',
      });
    }
    return next();
  },
};
