import { LoginParams, LoginResponse } from '@type/api/auth';
import { api } from './api';
import { AxiosPromise } from 'axios';

export const login = (body: LoginParams): AxiosPromise<LoginResponse> =>
  api.post(`/login`, body);
