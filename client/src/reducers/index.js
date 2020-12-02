import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import budgetReducer from "./budgetReducer";

export default combineReducers({
  auth: authReducer,
  msg: messageReducer,
  budget: budgetReducer,
});