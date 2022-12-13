// Coloque aqui suas actions
export const SUCCESSFUL_LOGIN = 'LOGIN';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const START_FETCH = 'START_FETCH';

export const actionSuccessfulLogin = (email) => ({
  type: SUCCESSFUL_LOGIN,
  payload: email,
});

export const actionSetCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
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
