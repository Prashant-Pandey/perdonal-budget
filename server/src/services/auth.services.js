const bcrypt = require('bcryptjs');
const saltRounds = 10;
require('dotenv').config();
const User = require('./user.service');
const errorHandler = require('../common.error.handling');
// auth service
async function verifyAuth(email, password) {
  // validate the email exists in db or not
  const user = await User.findUserByEmail(email);
  // send error
  if (!user) {
    return errorHandler.clientBasedError('Please register');
  }
  // user service throws an error
  if (user.err) {
    return user;
  }
  // login success
  if (bcrypt.compareSync(password, user.password)) {
    return user;
  }
  // client error
  return errorHandler.clientBasedError('Username or password is incorrect');
}

async function signupUser(userObject) {
  // encrypting the password
  userObject.password = await bcrypt.hashSync(userObject.password, saltRounds);
  const user = await User.createUser(userObject);
  // return the result
  return user;
}

module.exports = {
  verifyAuth,
  signupUser
};
