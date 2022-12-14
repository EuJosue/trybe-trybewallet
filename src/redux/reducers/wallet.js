// Esse reducer será responsável por tratar as informações da pessoa usuária

import {
  DELETE_EXPENSE,
  START_EDIT_EXPENSE,
  NEW_EXPENSE,
  SET_CURRENCIES,
  START_FETCH,
  FINISH_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // boolean que indica de uma despesa está sendo editada
  idToEdit: 0, // numérico que armazena o id da despesa que esta sendo editada
  totalExpense: '0.00',
  isFetching: false,
};

function totalExpense(expenses) {
  return expenses
    .reduce((total, { value, exchangeRates, currency }) => (
      total + (Number(value) * exchangeRates[currency].ask)
    ), 0)
    .toFixed(2);
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DELETE_EXPENSE: {
    const expenses = state.expenses.filter(({ id }) => id !== action.payload);

    return {
      ...state,
      expenses,
      totalExpense: totalExpense(expenses),
    };
  }

  case START_EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };

  case FINISH_EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: action.payload,
      totalExpense: totalExpense(action.payload),
    };

  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case START_FETCH:
    return {
      ...state,
      isFetching: true,
    };

  case NEW_EXPENSE: {
    const expenses = [...state.expenses, action.payload]
      .map((expense, index) => {
        expense.id = index;
        return expense;
      });

    return {
      ...state,
      expenses,
      totalExpense: totalExpense(expenses),
      isFetching: false,
    };
  }

  default:
    return state;
  }
};

export default userReducer;
