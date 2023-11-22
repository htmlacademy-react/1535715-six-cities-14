import axios, { AxiosError, AxiosInstance } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { proccessErrorHandle } from './error-handle';

type ErrorMessage = {
  errorType: string;
  message: string;
};

const SERVER_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const statusCodes = [
  StatusCodes.BAD_REQUEST,
  StatusCodes.NOT_FOUND,
  StatusCodes.BAD_GATEWAY,
  StatusCodes.CONFLICT,
];

export const creatAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessage>) => {
      if (error.response && statusCodes.includes(error.response.status)) {
        proccessErrorHandle(error.response.data.message);
      }

      throw error;
    }
  );

  return api;
};
