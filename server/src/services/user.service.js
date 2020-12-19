require('dotenv').config();
const User = require('../models/User').User;
const errorHandler = require('../common.error.handling');

async function createUser(userObject) {
  try {
    if ((await User.find({ email: userObject.email })).length > 0) {
      // user exists
      return errorHandler.clientBasedError('User with this email exists, please try to login or use forgot password');
    }
    // new user register
    const user = await User.create(userObject);
    return user;
  } catch (error) {
    return errorHandler.internalServerError(error.message);
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return errorHandler.internalServerError(error.message);
  }
}

async function findById(id) {
  return await User.findById(id);
}

module.exports = {
  createUser,
  findUserByEmail,
  findById
};
