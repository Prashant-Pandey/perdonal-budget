import { actions } from '../actions/index';
const initState = {
   budgets: []
}

const budgetReducer = (state = initState, action) => {
   const { type, payload } = action;

   switch (type) {
      case actions.getBudgetsBetweenTwoDate:
         return {
            ...state,
            budgets: payload
         };
      case actions.createBudget:
         return {
            ...state,
            budgetCreated: true,
            budgets: [...state.budgets, payload]
         }
      case actions.updateBudget:
         const updatedBudgetTypes = state.budgets.map((budget) => {
            if (budget._id === payload.id) {
               return {
                  _id: budget._id,
                  title: payload.data.title || budget.title,
                  description: payload.data.description || budget.description,
                  cost: payload.data.cost || budget.cost,
                  date: payload.data.date || budget.date,
               }
            };
            return budget;
         });
         return {
            ...state,
            budgets: updatedBudgetTypes
         };
      case actions.deleteBudget:
         const filteredBudgets = state.budgets.filter((budget) => {
            return budget._id !== payload
         });
         return {
            ...state,
            budgets: filteredBudgets
         };
      default:
         return state;
   }
}

export default budgetReducer;