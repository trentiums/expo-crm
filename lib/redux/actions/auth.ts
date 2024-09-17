import { forgotPassword, login } from '@api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse } from '@type/api/api';
import {
  ForgotPasswordParams,
  LoginParams,
  LoginResponse,
} from '@type/api/auth';
import { withToastForError } from '@utils/thunk';

export const loginUserAction = createAsyncThunk(
  'auth/loginUser',
  withToastForError<LoginParams, LoginResponse>(async (data) => {
    const response = await login(data);
    return response.data;
  }),
);

export const logoutUserAction = createAsyncThunk(
  'auth/logout',
  withToastForError<void, any>(() => {
    return Promise.resolve({ status: true, data: true });
  }),
);
export const forgotPasswordAction = createAsyncThunk(
  'auth/forgotPassword',
  withToastForError<ForgotPasswordParams, ApiResponse>(async (data) => {
    const response = await forgotPassword(data);
    return response.data;
  }),
);
