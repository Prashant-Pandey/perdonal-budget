import { setCookie } from '../commons/cookie';
import { AuthService } from '../services/AuthService';
import { actions } from './index';

const dispatchError = (dispatch, errObj, action) => {
  dispatch({
    type: action
  });

  dispatch({
    type: actions.setMessage,
    payload: errObj
  })
}

export const login = (loginJSON) => (dispatch) => {
  return new AuthService().login(loginJSON).then((data) => {
    if (data.error) {
      dispatchError(dispatch, data, actions.loginFail)
      return Promise.reject();
    }
    const token = data.token;
    setCookie("token", token, data.ttl)
    dispatch({
      type: actions.loginSuccess,
      payload: {
        token,
        ttl: data.ttl
      }
    });

    return Promise.resolve();
  }).catch((error = { message: 'Check internet', error: true }) => {
    dispatchError(dispatch, error, actions.loginFail)
    return Promise.reject();
  })
}

export const signup = (signupJSON) => (dispatch) => {
  return new AuthService().signup(signupJSON).then((data) => {
    if (data.err) {
      dispatchError(dispatch, data, actions.signupFail)
      return Promise.reject();
    }
    const token = data.token;
    setCookie("token", token, data.ttl)
    dispatch({
      type: actions.signupSuccess,
      payload: {
        token,
        ttl: data.ttl
      }
    });

    return Promise.resolve();
  }).catch((err = { message: 'Check internet', error: true }) => {
    dispatchError(dispatch, err, actions.signupFail)
    return Promise.reject();
  })
}

export const refresh = () => (dispatch) => {
  return new AuthService().refresh().then((data) => {
    if (data.err) {
      dispatchError(dispatch, data, actions.refreshFail)
      return Promise.reject();
    }
    
    const token = data.token;
    setCookie("token", token, data.ttl)
    dispatch({
      type: actions.refresh,
      payload: {
        token,
        ttl: data.ttl
      }
    });
  }).catch((err = { message: 'Check internet', error: true }) => {
    dispatchError(dispatch, err, actions.refreshFail)
    return Promise.reject();
  })
}

export const logout = () => (dispatch) => {
  return new AuthService().logout().then((data) => {
    dispatch({
      type: actions.logout
    });

    return Promise.resolve();
  }).catch((err= { message: 'Check internet', error: true }) => {
    dispatchError(dispatch, err, actions.refreshFail)
    return Promise.reject();
  })
}