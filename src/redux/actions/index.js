// Coloque aqui suas actions
export const SUCCESSFUL_LOGIN = 'LOGIN';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export const actionSuccessfulLogin = (email) => ({
  type: SUCCESSFUL_LOGIN,
  payload: email,
});

export const actionSetCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});
