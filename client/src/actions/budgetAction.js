import { BudgetService } from '../services/BudgetService';
import { actions } from './index';
const dispatchError = (dispatch, errObj, action) => {
  dispatch({
    type: action
  });

  dispatch({
    type: actions.setMessage,
    payload: errObj
  })
}

export const getBudgetBetweenDates = (startDate, endDate) => (dispatch) => {
  return new BudgetService()
    .getAllBudgetBetweenDates(startDate, endDate)
    .then((data) => {
      if (!data || data.error) {
        dispatchError(dispatch, data, actions.getBudgetsBetweenTwoDateFailed)
        return Promise.reject();
      }

      dispatch({
        type: actions.getBudgetsBetweenTwoDate,
        payload: data
      });

      return Promise.resolve();
    }).catch((err) => {
      dispatchError(dispatch, err.message, actions.getBudgetsBetweenTwoDateFailed)
      return Promise.reject();
    })
}

export const getAllBudgets = () => (dispatch) => {
  return new BudgetService()
    .getAllBudgets()
    .then((data) => {

      if (!data || data.error) {
        dispatchError(dispatch, data, actions.getBudgetsBetweenTwoDateFailed)
        return Promise.reject();
      }

      dispatch({
        type: actions.getBudgetsBetweenTwoDate,
        payload: data
      });

      return Promise.resolve();

    }).catch((err) => {
      dispatchError(dispatch, err.message, actions.getBudgetsBetweenTwoDateFailed)
      return Promise.reject();
    })
}


export const createBudget = (budgetJSON) => (dispatch) => {
  return new BudgetService()
    .createBudgets(budgetJSON)
    .then((data) => {
      if (!data || data.error) {
        dispatchError(dispatch, data, actions.createBudgetFailed)
        return Promise.reject();
      }

      dispatch({
        type: actions.createBudget,
        payload: data
      });

      return Promise.resolve();

    }).catch((err) => {
      dispatchError(dispatch, err.message, actions.createBudgetFailed)
      return Promise.reject();
    })
}


export const updateBudget = (key, budgetJSON) => (dispatch) => {
  return new BudgetService()
    .updateBudget(key, budgetJSON)
    .then((data) => {

      if (!data || data.error) {
        dispatchError(dispatch, data, actions.updateBudgetFailed)
        return Promise.reject();
      }
      
      dispatch({
        type: actions.updateBudget,
        payload: { id: key, data: budgetJSON }
      });

      return Promise.resolve();

    }).catch((err) => {
      dispatchError(dispatch, err.message, actions.updateBudgetFailed)
      return Promise.reject();
    })
}


export const deleteBudget = (budgetId) => (dispatch) => {
  return new BudgetService()
    .deleteBudgets(budgetId)
    .then((data) => {

      if (!data || data.error) {
        dispatchError(dispatch, data, actions.deleteBudgetFailed)
        return Promise.reject();
      }

      dispatch({
        type: actions.deleteBudget,
        payload: budgetId
      });

      return Promise.resolve();

    }).catch((err) => {
      dispatchError(dispatch, err.message, actions.deleteBudgetFailed)
      return Promise.reject();
    })
}