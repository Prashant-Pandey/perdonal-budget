import {actions} from "../actions/index";

const initialState = {
  message: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.setMessage:
      return { message: payload };

    case actions.clearMessage:
      return { message: "" };

    default:
      return state;
  }
}