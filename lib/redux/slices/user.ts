import {
  deleteUserAction,
  getAssignUserListAction,
  getUserDetailAction,
  getUserListAction,
} from '@redux/actions/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AssignUser,
  AssignUserListResponse,
  AssignUserState,
  UserDetailsResponse,
  UserListResponse,
  UserStateType,
} from '@type/api/user';
import { formatAssignUser, formateUser, formatUserDetail } from '@utils/user';

export interface UserState {
  userList: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    users: UserStateType[];
  };
  assignUserList: AssignUserState[];
  userDetail: UserStateType;
}
const initialState: UserState = {
  userList: {
    currentPage: 0,
    lastPage: 0,
    perPage: 0,
    total: 0,
    users: [],
  },
  userDetail: {
    id: 0,
    name: '',
    email: '',
    userRole: 0,
    createdAt: '',
  },
  assignUserList: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserListAction.fulfilled,
      (state, action: PayloadAction<UserListResponse>) => {
        const userList = formateUser(action?.payload?.data?.data);
        if (
          action.payload.data.current_page !== 1 &&
          state.userList.currentPage !== action.payload.data.current_page
        ) {
          let mergedData = state.userList.users.concat(userList);
          state.userList.users = mergedData;
        } else {
          state.userList.users = userList;
        }
        state.userList.currentPage = action.payload.data.current_page;
        state.userList.currentPage = action.payload.data.current_page;
        state.userList.lastPage = action.payload.data.last_page;
        state.userList.perPage = action.payload.data.per_page;
        state.userList.total = action.payload.data.total;
      },
    );

    builder.addCase(
      getUserDetailAction.fulfilled,
      (state, action: PayloadAction<UserDetailsResponse>) => {
        const data = formatUserDetail(action.payload.data);
        state.userList.users = state.userList.users.map((item) =>
          item.id === data.id ? data : item,
        );
        state.userDetail = data;
      },
    );

    builder.addCase(
      deleteUserAction.fulfilled,
      (state, action: PayloadAction<UserDetailsResponse>) => {
        state.userList.users = state.userList.users?.filter(
          (item) => item?.id !== action.payload.body?.user_id,
        );
      },
    );
    builder.addCase(
      getAssignUserListAction.fulfilled,
      (state, action: PayloadAction<AssignUserListResponse>) => {
        state.assignUserList = formatAssignUser(action.payload.data);
      },
    );
  },
});

export default userSlice.reducer;
