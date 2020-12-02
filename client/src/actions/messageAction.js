import actions from './index';
export const setMessage = (message) => ({
  type: actions.setMessage,
  payload: message
});

export const clearMessage = () => ({
  type: actions.clearMessage,
});