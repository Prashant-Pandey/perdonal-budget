const mongoose = require('mongoose');

// const budgetTypeNature = ['INCOME', 'EXPENSE'];

const iBudgetType = new mongoose.Schema({
  name: {
    type: String
  },
  goal: {
    type: Number
  }
});

const iBudget = new mongoose.Schema({
  title: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  cost: {
    type: Number
  },
  date: {
    type: String
  }
}, {
  timestamps: true
});

// const Budget = mongoose.model('Budget', budgetSchema);

module.exports = {
  iBudget,
  iBudgetType
};
