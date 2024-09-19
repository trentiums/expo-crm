import { withToastForError } from '@utils/thunk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AssignLeadToUserParams,
  AssignUserListResponse,
  DeleteUserParams,
  SaveUserParams,
  UpdateUserParams,
  UserDetailsParams,
  UserDetailsResponse,
  UserListParams,
  UserListResponse,
} from '@type/api/user';
import {
  assignLeadToUserList,
  assignUserList,
  deleteAccount,
  deleteUser,
  saveUser,
  updateUser,
  userDetail,
  userList,
} from '@api/user';
import { ApiResponse } from '@type/api/api';
export const getUserListAction = createAsyncThunk<
  UserListResponse,
  UserListParams
>(
  'user/userList',
  withToastForError(async (body) => {
    const response = await userList(body);
    return response.data;
  }),
);
export const addUserAction = createAsyncThunk<ApiResponse, SaveUserParams>(
  'user/addUser',
  withToastForError(async (body) => {
    const response = await saveUser(body);
    return response.data;
  }),
);
export const updateUserAction = createAsyncThunk<ApiResponse, UpdateUserParams>(
  'user/updateUser',
  withToastForError(async (body) => {
    const response = await updateUser(body);
    return response.data;
  }),
);
export const deleteUserAction = createAsyncThunk<ApiResponse, DeleteUserParams>(
  'user/deleteUser',
  withToastForError(async (body) => {
    const response = await deleteUser(body);
    return { ...response.data, body };
  }),
);
export const getUserDetailAction = createAsyncThunk<
  UserDetailsResponse,
  UserDetailsParams
>(
  'user/userDetail',
  withToastForError(async (body) => {
    const response = await userDetail(body);
    return response.data;
  }),
);

export const getAssignUserListAction = createAsyncThunk<
  AssignUserListResponse,
  UserListParams
>(
  'user/assignUserList',
  withToastForError(async (body) => {
    const response = await assignUserList(body);
    return response.data;
  }),
);

export const deleteAccountAction = createAsyncThunk<ApiResponse>(
  'user/deleteAccount',
  withToastForError(async () => {
    const response = await deleteAccount();
    return { ...response.data };
  }),
);

export const assignLeadToUserAction = createAsyncThunk<
  ApiResponse,
  AssignLeadToUserParams
>(
  'user/assignLeadToUser',
  withToastForError(async (body) => {
    const response = await assignLeadToUserList(body);
    return response.data;
  }),
);
