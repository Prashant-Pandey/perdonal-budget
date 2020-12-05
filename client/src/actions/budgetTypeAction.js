import { BudgetTypeService } from '../services/BudgetTypeService';
import { actions } from './index';

export const getBudgetTypes = () => (dispatch) => {
  return new BudgetTypeService()
  .getAllBudgetTypes()
  .then((data) => {
    if (data.err) {
      dispatch({
        type: actions.getBudgetTypesFailed,
        payload: data.err
      })
      return Promise.reject();
    }
    dispatch({
      type: actions.getBudgetTypes,
      payload: data
    });

    return Promise.resolve();

  }).catch((err) => {
    dispatch({
      type: actions.getBudgetTypesFailed,
      payload: err
    })
    return Promise.reject();
  })
}


export const createBudgetTypes = (budgetJSON) => (dispatch) => {
  return new BudgetTypeService()
    .createBudgetType(budgetJSON)
    .then((data) => {
      if (data.err) {
        dispatch({
          type: actions.createBudgetTypeFailed,
          payload: data.err
        })
        return Promise.reject();
      }

      dispatch({
        type: actions.createBudgetType,
        payload: data
      });

      return Promise.resolve();

    }).catch((err) => {
      dispatch({
        type: actions.createBudgetTypeFailed,
        payload: err
      })
      return Promise.reject();
    })
}

export const updateBudgetType = (id, budgetType) => (dispatch) => {
  return new BudgetTypeService()
    .updateBudgetType(id, budgetType)
    .then((data) => {
      if (!data&&data.err) {
        dispatch({
          type: actions.updateBudgetTypeFailed,
          payload: data.err
        })
        return Promise.reject();
      }

      dispatch({
        type: actions.updateBudgetType,
        payload: {id, budgetType: budgetType}
      });

      return Promise.resolve();

    }).catch((err) => {
      dispatch({
        type: actions.updateBudgetTypeFailed,
        payload: err
      })
      return Promise.reject();
    })
}

export const deleteBudgetTypes = (budgetId) => (dispatch) => {
  return new BudgetTypeService()
    .deleteBudgetType(budgetId)
    .then((data) => {
      if (data.err) {
        dispatch({
          type: actions.deleteBudgetTypeFailed,
          payload: data.err
        })
        return Promise.reject();
      }

      dispatch({
        type: actions.deleteBudgetType,
        payload: budgetId
      });

      return Promise.resolve();

    }).catch((err) => {
      dispatch({
        type: actions.deleteBudgetTypeFailed,
        payload: err
      })
      return Promise.reject();
    })
}