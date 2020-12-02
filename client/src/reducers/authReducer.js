import { getCookie, deleteCookie } from '../commons/cookie'
import { actions } from '../actions/index';
const initState = {
   isLoggedIn: true
}

const authReducer = (state = initState, action) => {
   const { type, payload } = action;
   
   switch (type) {
      case actions.signupSuccess:
         return {
            ...state,
            isLoggedIn: true
         };
      case actions.signupFail:
         return {
            ...state,
            isLoggedIn: false
         };
      case actions.loginSuccess:
         return {
            ...state,
            isLoggedIn: true
         };
      case actions.loginFail:
         return {
            ...state,
            isLoggedIn: false
         };
      case actions.logout:
         return {
            ...state,
            isLoggedIn: false
         };
      default:
         if (getCookie("token")) {
            state.isLoggedIn = true
         } else {
            state.isLoggedIn = false
         }
         return state;
   }
}

export default authReducer;