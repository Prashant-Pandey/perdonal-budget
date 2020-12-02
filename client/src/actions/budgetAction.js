import { BudgetService } from '../services/BudgetService';
import { actions } from './index';

export const getBudgetBetweenDates = (startDate, endDate) => (dispatch) => {
  return new BudgetService().getAllBudgetBetweenDates(startDate, endDate).then((data) => {
    if (data.err) {
      dispatch({
        type: actions.getBudgetsBetweenTwoDateFailed
      })
      return Promise.reject();
    }
    console.log('budget data: ', data);
    dispatch({
      type: actions.getBudgetsBetweenTwoDate,
      payload: data
    });

    return Promise.resolve();

  }).catch((err) => {
    dispatch({
      type: actions.getBudgetsBetweenTwoDateFailed
    })
    return Promise.reject();
  })
}


export const createBudget = (budgetJSON) => (dispatch) => {
  return new BudgetService()
    .createBudgets(budgetJSON)
    .then((data) => {
      if (data.err) {
        dispatch({
          type: actions.createBudgetFailed
        })
        return Promise.reject();
      }

      dispatch({
        type: actions.createBudget,
        payload: data
      });

      return Promise.resolve();

    }).catch((err) => {
      dispatch({
        type: actions.createBudgetFailed
      })
      return Promise.reject();
    })
}