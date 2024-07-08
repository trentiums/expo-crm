import { withToastForError } from '@utils/thunk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DeleteUserParams,
  SaveUserParams,
  UpdateUserParams,
  UserListParams,
  UserListResponse,
} from '@type/api/user';
import { deleteUser, saveUser, updateUser, userList } from '@api/user';
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
    return response.data;
  }),
);
