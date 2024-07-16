import { getUserListAction } from '@redux/actions/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserListResponse, UserStateType } from '@type/api/user';
import { formateUser } from '@utils/user';

export interface UserState {
  userList: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    users: UserStateType[];
  };
}
const initialState: UserState = {
  userList: {
    currentPage: 0,
    lastPage: 0,
    perPage: 0,
    users: [],
  },
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
        if (action.payload.data.current_page !== 1) {
          let mergedData = state.userList.users.concat(userList);
          state.userList.users = mergedData;
        } else {
          state.userList.users = userList;
        }
        state.userList.currentPage = action.payload.data.current_page;
        state.userList.lastPage = action.payload.data.last_page;
        state.userList.perPage = action.payload.data.per_page;
      },
    );
  },
});

export default userSlice.reducer;
