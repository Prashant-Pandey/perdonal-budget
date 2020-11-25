// Require Mongoose
const mongoose = require('mongoose');
const { iBudget, iBudgetType } = require('./Budget');
// Define a schema
const Schema = mongoose.Schema;

const iUser = ({ firstName, lastName, email, password, phone }) => {
  return {
    firstName,
    lastName,
    email,
    password,
    phone
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
  phone: String,
  budgets: {
    type: [iBudget],
    default: []
  },
  budgetTypes: {
    type: [iBudgetType],
    default: []
  }
});

module.exports = {
  UserObject: iUser,
  User: mongoose.model('User', UserSchema)
};
