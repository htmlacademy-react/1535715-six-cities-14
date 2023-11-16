const AUTH_TOKEN_KEY = 'six-cities-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  return token ?? '';
};

export const setToken = (token: Token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
