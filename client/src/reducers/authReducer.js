import { getCookie, deleteCookie } from '../commons/cookie'
import { actions } from '../actions/index';
const initState = {
   isLoggedIn: true,
   token: null,
   ttl: 0
}

const authReducer = (state = initState, action) => {
   const { type, payload } = action;

   switch (type) {
      case actions.signupSuccess:
         return {
            ...state,
            isLoggedIn: true,
            ttl: payload
         };
      case actions.loginSuccess:
         return {
            ...state,
            isLoggedIn: true,
            ttl: payload
         };
      case actions.logout:
         return {
            ...state,
            isLoggedIn: false,
            ttl: 0
         };
      case actions.refresh:
         return {
            ...state,
            isLoggedIn: true,
            ttl: payload
         }
      case actions.changeRefresh:
         return {
            ...state,
            ttl: payload
         }
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