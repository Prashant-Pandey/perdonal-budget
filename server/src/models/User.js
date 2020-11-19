// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const iUser = ({ firstName, lastName, email, password, countryCode, phone }) => {
  return {
    firstName, lastName, email, password, countryCode, phone
  };
};

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  countryCode: Number,
  phone: String
});

module.exports = {
  UserObject: iUser,
  User: mongoose.model('User', UserSchema)
};
