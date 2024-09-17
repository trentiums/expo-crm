import { logout } from '@redux/slices/auth';
import store from '@redux/store';
import { StatusCode } from '@type/api/api';
import axios from 'axios';

export const baseURL = 'https://crm.trentiums.com/api/v1/';
export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.user.token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === StatusCode.Unauthorized) {
    store.dispatch(logout());
  }
  return Promise.reject(error);
});
