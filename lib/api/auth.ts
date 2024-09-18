import {
  ForgotPasswordParams,
  LoginParams,
  LoginResponse,
} from '@type/api/auth';
import { api } from './api';
import { AxiosPromise } from 'axios';
import { ApiResponse } from '@type/api/api';

export const login = (body: LoginParams): AxiosPromise<LoginResponse> =>
  api.post(`/login`, body);
export const forgotPassword = (
  body: ForgotPasswordParams,
): AxiosPromise<ApiResponse> => api.post(`/forgot-password`, body);

export const logoutAccount = (): AxiosPromise<ApiResponse> => {
  return api.post('/logout');
};
