import { setCookie } from '../commons/cookie';
import { AuthService } from '../services/AuthService';
import { actions } from './index';

const dispatchError = (dispatch, errObj, action) => {
  console.log('dispatchError: ', errObj);
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
    if (data.success) {
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
    }

    const token = data.token;
    setCookie("token", token, data.ttl*10000);
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
    const token = data.token;
    setCookie("token", token, data.ttl*100);
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

    const token = data.token;
    setCookie("token", token, data.ttl*10000);
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
