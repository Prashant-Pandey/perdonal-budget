import { AuthService } from '../services/AuthService';
import { actions } from './index';

export const login = (loginJSON) => (dispatch) => {
  return new AuthService().login(loginJSON).then((data) => {
    if (data.error) {
      console.log(data);
      dispatch({
        type: actions.loginFail
      });
      dispatch({
        type: actions.setMessage,
        payload: data
      })
      return Promise.reject();
    }

    dispatch({
      type: actions.loginSuccess,
      payload: data.ttl
    });

    return Promise.resolve();
  }).catch((error) => {
    dispatch({
      type: actions.loginFail,
      payload: error
    })
    return Promise.reject();
  })
}

export const signup = (signupJSON) => (dispatch) => {
  return new AuthService().signup(signupJSON).then((data) => {
    if (data.err) {
      // showError(dispatch, data.err, actions.signupFail);
      return Promise.reject();
    }

    dispatch({
      type: actions.loginSuccess,
      payload: data.ttl
    });

    return Promise.resolve();
  }).catch((err) => {
    // showError(dispatch, err.message, actions.signupFail);
    return Promise.reject();
  })
}

export const refresh = () => (dispatch) => {
  return new AuthService().refresh().then((data) => {
    if (data.err) {
      // showError(dispatch, data.err, actions.refreshFail);
      return Promise.reject();
    }

    dispatch({
      type: actions.refresh,
      payload: data.ttl
    });
  }).catch((err = "Connectivity error") => {
    // showError(dispatch, err.message, actions.refreshFail);
    return Promise.reject();
  })
}

export const logout = () => (dispatch) => {
  return new AuthService().logout().then((data) => {
    dispatch({
      type: actions.logout
    });

    return Promise.resolve();
  }).catch((err) => {
    // showError(dispatch, err.message, actions.logout);
    return Promise.reject();
  })
}