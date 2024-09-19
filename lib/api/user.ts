import {
  AssignLeadToUserParams,
  AssignUserListResponse,
  ChangePasswordParams,
  DeleteUserParams,
  SaveUserParams,
  UpdateUserParams,
  UserDetailsParams,
  UserDetailsResponse,
  UserListParams,
  UserListResponse,
} from '@type/api/user';
import { api } from './api';
import { AxiosPromise } from 'axios';
import { ApiResponse } from '@type/api/api';
export const userList = (
  body: UserListParams,
): AxiosPromise<UserListResponse> =>
  api.get(`/company-user-list`, { params: body });

export const saveUser = (body: SaveUserParams): AxiosPromise<ApiResponse> =>
  api.post(`/save-company-user`, body);

export const deleteUser = (
  body: DeleteUserParams,
): AxiosPromise<ApiResponse> => {
  return api.post('/delete-company-user', body);
};

export const updateUser = (
  body: UpdateUserParams,
): AxiosPromise<ApiResponse> => {
  return api.post('/update-company-user', body);
};

export const userDetail = (
  body: UserDetailsParams,
): AxiosPromise<UserDetailsResponse> => {
  return api.get('/company-user-details', { params: body });
};

export const assignUserList = (
  body: UserListParams,
): AxiosPromise<AssignUserListResponse> => {
  return api.get('/assign-company-user-list', { params: body });
};

export const deleteAccount = (): AxiosPromise<ApiResponse> => {
  return api.post('/delete-account');
};

export const changePassword = (
  body: ChangePasswordParams,
): AxiosPromise<ApiResponse> => api.post(`/change-password`, body);

export const assignLeadToUserList = (
  body: AssignLeadToUserParams,
): AxiosPromise<ApiResponse> => {
  return api.post('/assign-lead', body);
};
