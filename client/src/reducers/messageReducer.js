import {actions} from "../actions/index";

const initialState = {
  message: '',
  error: false,
  success: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.setMessage:
      let type = 'success';
      let message = payload.message;
      console.log(message, payload);
      if (payload.error) {
        type = 'error';
        message = `Server Response ${payload.status||400}: `+ message
      }

      const newState = {
        message
      };
      newState[type] = message;
      console.log(message, payload, newState);
      return newState;
    case actions.clearMessage:
      return { message: '' };

    default:
      return state;
  }
}