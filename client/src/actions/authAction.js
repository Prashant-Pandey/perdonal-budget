import { getCookie } from '../commons/cookie';
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
    const token = getCookie("token")
    dispatch({
      type: actions.loginSuccess,
      payload: {
        token,
        ttl: data.ttl
      }
    });

    return Promise.resolve();
  }).catch((error) => {
    return Promise.reject();
  })
}

export const signup = (signupJSON) => (dispatch) => {
  return new AuthService().signup(signupJSON).then((data) => {
    if (data.err) {
      dispatchError(dispatch, data, actions.signupFail)
      return Promise.reject();
    }
    const token = data.getCookie("token")
    dispatch({
      type: actions.signupSuccess,
      payload: {
        token,
        ttl: data.ttl
      }
    });

    return Promise.resolve();
  }).catch((err) => {
    return Promise.reject();
  })
}

export const refresh = () => (dispatch) => {
  return new AuthService().refresh().then((data) => {
    if (data.err) {
      dispatchError(dispatch, data, actions.refreshFail)
      return Promise.reject();
    }
    const token = getCookie("token")
    dispatch({
      type: actions.refresh,
      payload: {
        token,
        ttl: data.ttl
      }
    });
  }).catch((err) => {
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
    return Promise.reject();
  })
}
