import { actions } from '../actions/index';
const initState = {
  budgetTypes: []
}

const budgetTypeReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.getBudgetTypes:
      return {
        ...state,
        budgetTypes: payload
      };
    case actions.getBudgetTypesFailed:
      return {
        ...state,
        budgetTypes: null,
      };
    case actions.createBudgetType:
      return {
        ...state,
        budgetTypes: [...state.budgetTypes, payload]
      };
    case actions.createBudgetTypeFailed:
      return {
        ...state,
        budgetTypeCreated: false,
      }
    case actions.updateBudgetType:
      const updatedBudgetTypes = state.budgetTypes.map((budgetType) => {
        if(budgetType._id===payload.id){
          return {
            _id: budgetType._id,
            name:payload.budgetType.name||budgetType.name,
            goal:payload.budgetType.goal||budgetType.goal,
          }
        };
        return budgetType;
      });
      return {
        ...state,
        budgetTypes: updatedBudgetTypes
      };
    case actions.updateBudgetFailed:
      return {
        ...state,
        updateBudgetTypeFailed: true
      };
    case actions.deleteBudgetType:
      const filteredBudgetTypes = state.budgetTypes.filter((budgetType) => {
        return budgetType._id !== payload
      });
      return {
        ...state,
        budgetTypes: filteredBudgetTypes
      };
    case actions.deleteBudgetTypeFailed:
      return {
        ...state,
        budgetTypeDeleteFailed: false,
      }
    default:
      return state;
  }
}

export default budgetTypeReducer;