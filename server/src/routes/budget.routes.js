const router = require('express').Router();
const budgetService = require('../services/budget.service');
// const budgetTypeService = require('../services/budget.types.service');
// const { body, validationResult } = require('express-validator');
// dates as a filter and transaction amout as a filter:[gte,eq,gt,lt,lte]
// get all budgets of the user or pass filters
router.get('/', async (req, res) => {
  const queryData = req.query;
  const userId = req.user_id;
  let dateFilter = {};
  let moneyFilter = {};
  if (queryData.startDate || queryData.endDate) {
    dateFilter.start = queryData.startDate ? new Date(queryData.startDate) : new Date(null);
    dateFilter.end = queryData.endDate ? new Date(queryData.endDate) : Date.now();
  } else {
    dateFilter = null;
  }

  if (queryData.startMoney || queryData.endMoney) {
    moneyFilter.start = queryData.startMoney ? parseFloat(queryData.startMoney) : -Infinity;
    moneyFilter.end = queryData.endMoney ? parseInt(queryData.endMoney) : Infinity;
  } else {
    moneyFilter = null;
  }
  const budgets = await budgetService.getBudgetWithFilters(userId, dateFilter, moneyFilter);
  res.json(budgets);
});
// get a particular budget budgets of the user
router.get('/:id', async (req, res) => {
  const userId = req.user_id;
  const budget = await budgetService.getBudgetById(userId, req.params.id);
  res.json(budget);
});
// create a budget
router.post('/', async (req, res) => {
  const userId = req.user_id;
  const budgetObject = req.body;
  console.log(budgetObject);
  const budget = await budgetService.createBudget(userId, budgetObject);
  if (budget.err) {
    return res.status(budget.err.status).send({
      err: budget.err.message
    });
  }
  res.json(budget);
});
// update a budget
router.put('/:id', async (req, res) => {
  const userId = req.user_id;
  const budgetObject = req.body;
  const budgetId = req.params.id;
  const budget = await budgetService.updateBudget(userId, budgetId, budgetObject);
  if (budget.err) {
    return res.status(budget.err.status).send({
      err: budget.err.message
    });
  }
  return res.json(budget);
});
// delete a budget
router.delete('/:id', async (req, res) => {
  const userId = req.user_id;
  const budgetId = req.params.id;
  const budget = await budgetService.deleteBudget(userId, budgetId);
  if (budget.err) {
    return res.status(budget.err.status).send({
      err: budget.err.message
    });
  }
  return res.json(budget);
});

module.exports = router;
