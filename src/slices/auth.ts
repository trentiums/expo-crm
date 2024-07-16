import { setAuthenticationToken } from "@api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUserAction, logoutUserAction } from "@redux/actions/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "@type/api/auth";
import { User } from "@type/redux/slices/auth";
import { formatAuthUser } from "@utils/auth";

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    name: "",
    email: "",
    userRole: undefined,
    userId: 0,
    token: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUserAction.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.user = formatAuthUser(action.payload?.data);
        setAuthenticationToken(state.user.token);
        AsyncStorage.setItem("token", state.user.token);
      }
    );
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.user = initialState.user;
      setAuthenticationToken("");
      AsyncStorage.removeItem("token");
    });
  },
});

export const { logout } = authSlice.actions;
console.log(authSlice, "authSlice");
export default authSlice.reducer;
