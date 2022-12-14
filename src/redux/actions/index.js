// Coloque aqui suas actions
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const START_FETCH = 'START_FETCH';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const START_EDIT_EXPENSE = 'START_EDIT_EXPENSE';
export const FINISH_EDIT_EXPENSE = 'FINISH_EDIT_EXPENSE';

export const actionSuccessfulLogin = (email) => ({
  type: SUCCESSFUL_LOGIN,
  payload: email,
});

export const actionSetCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

export const actionDeleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const actionStartEditExpense = (id) => ({
  type: START_EDIT_EXPENSE,
  payload: id,
});

export const actionFinishEditExpense = (expenses) => ({
  type: FINISH_EDIT_EXPENSE,
  payload: expenses,
});

const actionNewExpense = (expenseData) => ({
  type: NEW_EXPENSE,
  payload: expenseData,
});

const actionStartFetch = () => ({
  type: START_FETCH,
});

export const newExpense = (expense) => async (dispatch) => {
  dispatch(actionStartFetch());

  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      expense.exchangeRates = data;
      dispatch(actionNewExpense(expense));
    });
};

export const setCurrencies = () => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      dispatch(actionSetCurrencies(Object.keys(data)));
    });
};
