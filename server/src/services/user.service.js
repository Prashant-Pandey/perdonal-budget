require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User').User;
const errorHandler = require('../common.error.handling');
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function createUser(userObject) {
  try {
    if ((await User.find({ email: userObject.email })).length > 0) {
      // user exists
      return errorHandler.clientBasedError('User with this email exists, please try to login or use forgot password');
    }
    const user = await User.create(userObject);
    mongoose.connection.close();
    return user;
  } catch (error) {
    return errorHandler.internalServerError(error);
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    mongoose.connection.close();
    return user;
  } catch (error) {
    return {
      err: error
    };
  }
}

async function getAllUser() {

}

module.exports = {
  createUser,
  findUserByEmail,
  getAllUser

};
