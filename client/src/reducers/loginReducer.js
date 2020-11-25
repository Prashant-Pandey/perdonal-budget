const initState = {
   isLoggedIn: true
}

const loginReducer = (state = initState, action) =>{
   if (action==='CHANGE_LOGIN_STATUS') {
      return
   }
   return state;
}

export default loginReducer;