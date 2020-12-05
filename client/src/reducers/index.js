import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import budgetReducer from "./budgetReducer";
import budgetTypeReducer from "./budgetTypeReducer";

export default combineReducers({
  auth: authReducer,
  msg: messageReducer,
  budget: budgetReducer,
  types: budgetTypeReducer,
});