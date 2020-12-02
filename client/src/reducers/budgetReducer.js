import { actions } from '../actions/index';
const initState = {
   budgetData: []
}

const budgetReducer = (state = initState, action) => {
   const { type, payload } = action;

   switch (type) {
      case actions.getBudgetsBetweenTwoDate:
         return {
            ...state,
            budgetData: payload
         };
      case actions.createBudget: 
      return {
         ...state,
         budgetCreated: true, 
         budgetData: [...state.budgetData, payload]
      }
      default:
         return state;
   }
}

export default budgetReducer;