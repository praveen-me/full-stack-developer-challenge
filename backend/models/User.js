const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
});

// schema method for decrypt password and compare with the original one
userSchema.methods.verifyPassword = function (userPassword, cb) {
  // for userpassword === hash
  console.log(userPassword,'password')
  bcrypt.compare(userPassword, this.password, function (err, res) {
    if (err) return cb(err, false);
    return cb (null, res);
  });
};

// Hash the password before save
userSchema.pre('save', function (next) {
  const password = this.password;

  if (this.isModified(password)) return next();

  // hash the password and stored in the db instead of string password
  return bcrypt.hash(password, SALT_FACTOR, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
