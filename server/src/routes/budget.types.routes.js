const router = require('express').Router();
const budgetTypeService = require('../services/budget.types.service');

router.get('/', async (req, res) => {
  const userId = req.user_id;
  const budget = await budgetTypeService.getAllBudgetTypes(userId);
  res.json(budget);
});

router.get('/:id', async (req, res) => {
  const userId = req.user_id;
  const budget = await budgetTypeService.getBudgetTypeById(userId, req.params.id);
  res.json(budget);
});
// create a budget
router.post('/', async (req, res) => {
  const userId = req.user_id;
  const budgetObject = req.body;
  const budget = await budgetTypeService.createBudgetType(userId, budgetObject);
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
  const budgetTypeObject = req.body;
  const budgetId = req.params.id;
  const budget = await budgetTypeService.updateBudgetType(userId, budgetId, budgetTypeObject);
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
  const budget = await budgetTypeService.deleteBudgetTypes(userId, budgetId);
  if (budget.err) {
    return res.status(budget.err.status).send({
      err: budget.err.message
    });
  }
  return res.json(budget);
});

module.exports = router;
