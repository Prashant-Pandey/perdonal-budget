import { dispatch } from 'd3';
import { AuthService } from '../services/AuthService';
import { actions } from './index';
const showError = function (error, action) {
  dispatch({
    type: action
  });

  dispatch({
    type: actions.setMessage,
    payload: error
  });
}

export const login = (loginJSON) => (dispatch) => {
  return new AuthService().login(loginJSON).then((data) => {
    if (data.err) {
      showError(data.err, actions.loginFail);
      return Promise.reject();
    }

    dispatch({
      type: actions.loginSuccess,
      isLoggedIn: true
    });

    return Promise.resolve();
  }).catch((err) => {
    showError(err.message, actions.loginFail);
    return Promise.reject();
  })
}

export const signup = (signupJSON) => (dispatch) => {
  return new AuthService().signup(signupJSON).then((data) => {
    if (data.err) {
      showError(data.err, actions.signupFail);
      return Promise.reject();
    }

    dispatch({
      type: actions.loginSuccess,
      isLoggedIn: true
    });

    return Promise.resolve();
  }).catch((err) => {
    showError(err.message, actions.signupFail);
    return Promise.reject();
  })
}

export const logout = () => {
  return {
    type: actions.logout,
    isLoggedIn: false
  }
}