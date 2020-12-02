const mongoose = require('mongoose');

// const budgetTypeNature = ['INCOME', 'EXPENSE'];

const iBudgetType = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

const iBudget = new mongoose.Schema({
  title: {
    type: String
  },
  type: {
    type: String
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
    type: Date
  }
}, {
  timestamps: true
});

// const Budget = mongoose.model('Budget', budgetSchema);

module.exports = {
  iBudget,
  iBudgetType
};
