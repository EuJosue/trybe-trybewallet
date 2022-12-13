// Esse reducer será responsável por tratar as informações da pessoa usuária

import { NEW_EXPENSE, SET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // boolean que indica de uma despesa está sendo editada
  idToEdit: 0, // numérico que armazena o id da despesa que esta sendo editada
  totalExpense: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
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
      totalExpense: expenses
        .reduce((total, { value, exchangeRates, currency }) => (
          total + (Number(value) * exchangeRates[currency].ask)
        ), 0)
        .toFixed(2),
    };
  }

  default:
    return state;
  }
};

export default userReducer;
