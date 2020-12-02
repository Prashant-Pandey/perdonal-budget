require('dotenv').config();
const User = require('../models/User').User;

const errorHandler = require('../common.error.handling');

async function createBudgetType(userId, budgetTypeObj) {
  try {
    const checkingExistingBudget = await User.findOne({ _id: userId, 'budgetTypes.name': budgetTypeObj.name }, { 'budgetTypes.$': 1 });
    if (checkingExistingBudget) {
      return errorHandler.clientBasedError('Budget type already created');
    }
    const budgetType = await User.updateOne({ _id: userId }, {
      $push: {
        budgetTypes: budgetTypeObj
      }
    });
    return budgetType;
  } catch (error) {
    return errorHandler.internalServerError(error.message);
  }
}

async function getBudgetTypeById(userId, budgetTypeId) {
  try {
    const budgetType = await User.findOne({ _id: userId, 'budgetTypes._id': budgetTypeId }, { 'budgetTypes.$': 1 });
    console.log(budgetType, userId, budgetTypeId);
    return budgetType;
  } catch (error) {
    return errorHandler.internalServerError(error.message);
  }
}

async function getAllBudgetTypes(userId) {
  try {
    const userBudgetData = await (await User.findOne({ _id: userId }, { _id: 0, budgetTypes: 1 })).get('budgetTypes');
    return userBudgetData;
  } catch (error) {
    console.log(error);
    return errorHandler.internalServerError(error.message);
  }
}

async function getBudgetWithFilters(userId, nature, name) {
  const budgetTypes = await getAllBudgetTypes(userId);
  if (nature) {
    return await getBudgetTypesNature(budgetTypes, nature);
  }
  if (name) {
    return await getBudgetTypesName(budgetTypes, name);
  }
  return budgetTypes;
}

async function getBudgetTypesNature(data, startDate, endDate) {
  const filterData = data.filter((budgetType) => {
    return budgetType.date >= startDate && budgetType.date <= endDate;
  });
  return filterData;
}

async function getBudgetTypesName(data, startMoney, endMoney) {
  const filterData = data.filter((val) => {
    console.log(val.cost);
    return val.cost >= startMoney && val.cost <= endMoney;
  });
  return filterData;
}

async function updateBudgetType(userId, budgetId, budgetObject) {
  const updateObj = {};
  for (const key in budgetObject) {
    updateObj[`budgetTypes.$.${key}`] = budgetObject[key];
  }
  try {
    const budgetType = await User.updateOne({ _id: userId, 'budgetTypes._id': budgetId }, {
      $set: updateObj
    });

    if (budgetType === null) {
      const res = errorHandler.clientBasedError('Budget does not exists');
      return res;
    }

    return budgetType;
  } catch (error) {
    console.log(error.message);
    return errorHandler.internalServerError(error.message);
  }
}

async function deleteBudgetTypes(userId, budgetTypeId) {
  try {
    const budgetType = await User.updateOne({ _id: userId, 'budgetTypes._id': budgetTypeId }, {
      $pull: {
        'budgetTypes.$': { _id: budgetTypeId }
      }
    });

    if (budgetType === null) {
      const res = errorHandler.clientBasedError('Budget does not exists');
      return res;
    }

    return budgetType;
  } catch (error) {
    console.log(error.message);
    return errorHandler.internalServerError(error.message);
  }
}

module.exports = {
  createBudgetType,
  getBudgetTypeById,
  getAllBudgetTypes,
  getBudgetWithFilters,
  updateBudgetType,
  deleteBudgetTypes
};
