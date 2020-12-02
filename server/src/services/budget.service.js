require('dotenv').config();
const User = require('../models/User').User;

const errorHandler = require('../common.error.handling');
// const Budget = require('../models/Budget').budgetSchema;

async function createBudget(userId, budgetObject) {
  try {
    await User.updateOne({ _id: userId }, {
      $push: {
        budgets: budgetObject
      }
    });
    const budget = await User.findOne({ _id: userId, 'budgets.title': budgetObject.title, 'budgets.type': budgetObject.type, 'budgets.cost': budgetObject.cost, 'budgets.date': budgetObject.date }, { 'budgets.$': 1 });
    return budget.budgets[0];
  } catch (error) {
    return errorHandler.internalServerError(error.message);
  }
}

async function getBudgetById(userId, budgetId) {
  try {
    const budget = await User.findOne({ _id: userId, 'budgets._id': budgetId }, { 'budgets.$': 1 });
    return budget;
  } catch (error) {
    return errorHandler.internalServerError(error.message);
  }
}

async function getAllBudgets(userId) {
  try {
    const userBudgetData = (await User.findOne({ _id: userId }, { _id: 0, budgets: 1 })).get('budgets');
    return userBudgetData;
  } catch (error) {
    console.log(error);
    return errorHandler.internalServerError(error.message);
  }
}

async function getBudgetWithFilters(userId, dateFilter, moneyFilter) {
  let budgets = await getAllBudgets(userId);
  // if (budgets.err) {
  //   return budgets;
  // }
  if (dateFilter) {
    budgets = await getBudgetBetweenDate(budgets, dateFilter.start, dateFilter.end);
  }
  if (moneyFilter) {
    budgets = await getBudgetBetweenMoneyLimits(budgets, moneyFilter.start, moneyFilter.end);
  }
  return budgets;
}

async function getBudgetBetweenDate(data = [], startDate, endDate) {
  const filterData = data.filter((budget) => {
    return budget.date >= startDate && budget.date <= endDate;
  });
  return filterData;
}

async function getBudgetBetweenMoneyLimits(data, startMoney, endMoney) {
  const filterData = data.filter((val) => {
    console.log(val.cost);
    return val.cost >= startMoney && val.cost <= endMoney;
  });
  return filterData;
}

async function updateBudget(userId, budgetId, budgetObject) {
  const updateObj = {};
  for (const key in budgetObject) {
    updateObj[`budgets.$.${key}`] = budgetObject[key];
  }
  try {
    const budget = await User.updateOne({ _id: userId, 'budgets._id': budgetId }, {
      $set: updateObj
    });

    if (budget === null) {
      const res = errorHandler.clientBasedError('Budget does not exists');
      return res;
    }

    return budget;
  } catch (error) {
    console.log(error.message);
    return errorHandler.internalServerError(error.message);
  }
}

async function deleteBudget(userId, budgetId) {
  try {
    const budget = await User.updateOne({ _id: userId, 'budgets._id': budgetId }, {
      $pull: {
        'budgets.$': { _id: budgetId }
      }
    });

    if (budget === null) {
      const res = errorHandler.clientBasedError('Budget does not exists');
      return res;
    }

    return budget;
  } catch (error) {
    console.log(error.message);
    return errorHandler.internalServerError(error.message);
  }
}

module.exports = {
  createBudget,
  getBudgetById,
  getAllBudgets,
  getBudgetWithFilters,
  updateBudget,
  deleteBudget
};
