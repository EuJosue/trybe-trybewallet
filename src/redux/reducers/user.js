// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SUCCESSFUL_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESSFUL_LOGIN:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
