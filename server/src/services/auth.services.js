const bcrypt = require('bcryptjs');
const saltRounds = 10;
require('dotenv').config();
const User = require('./user.service');
const errorHandler = require('../common.error.handling');
// auth service
async function verifyAuth(email, password) {
  const user = await User.findUserByEmail(email);

  if (!user) {
    return errorHandler.clientBasedError('Please register');
  }

  if (user.err) {
    return user;
  }

  if (bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return errorHandler.clientBasedError('Username or password is incorrect');
}

async function signupUser(userObject) {
  userObject.password = await bcrypt.hashSync(userObject.password, saltRounds);
  return User.createUser(userObject);
}

module.exports = {
  verifyAuth,
  signupUser
};
