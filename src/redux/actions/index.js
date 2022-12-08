// Coloque aqui suas actions
export const SUCCESSFUL_LOGIN = 'LOGIN';

export const actionSuccessfulLogin = (email) => ({
  type: SUCCESSFUL_LOGIN,
  payload: email,
});
