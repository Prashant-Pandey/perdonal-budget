import { getCookie, deleteCookie } from '../commons/cookie'
import { actions } from '../actions/index';
const initState = {
   isLoggedIn: true,
   token: null,
   ttl: 0,
   popup: false,
   userCancelled: false
}

const authReducer = (state = initState, action) => {
   const { type, payload } = action;

   switch (type) {
      case actions.signupSuccess:
         return {
            ...state,
            isLoggedIn: true,
            ttl: payload.ttl,
            token: payload.token
         };
      case actions.loginSuccess:
         return {
            ...state,
            isLoggedIn: true,
            ttl: payload.ttl,
            token: payload.token
         };
      case actions.refresh:
         console.log(payload);
         return {
            ...state,
            isLoggedIn: true,
            ttl: payload.ttl,
            token: payload.token,
            userCancelled: false
         };
      case actions.decreaseTTL:
         let isLoggedIn = state.isLoggedIn,
            userCancelled = state.userCancelled,
            ttl = state.ttl - 1000,
            token = state.token,
            popup = state.popup;
         if (state.ttl <= 0) {
            console.log(';;; from reducer;;; ', state.ttl);
            deleteCookie("token");
            isLoggedIn = false;
            userCancelled = false;
            ttl = 0;
            token = null;
            popup = false;
         }

         if (state.ttl <= 59900 && !state.userCancelled) {
            popup = true;
         }
         return {
            ...state,
            ttl,
            popup,
            token,
            isLoggedIn,
            userCancelled
         };
      case actions.closePopup:
         return {
            ...state,
            popup: false,
            userCancelled: true
         }
      case actions.logout:
         return {
            ...state,
            isLoggedIn: false,
            userCancelled: false,
            ttl: 0
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