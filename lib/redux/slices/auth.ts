import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUserAction, logoutUserAction } from '@redux/actions/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from '@type/api/auth';
import { User } from '@type/redux/slices/auth';
import { formatAuthUser } from '@utils/auth';

export interface AuthState {
  user: User;
  currentLanguage: LanguageProps;
}

export interface LanguageProps {
  id: number;
  name: LanguageEnum;
  shortForm: string;
}
export enum LanguageEnum {
  english = 'English',
  gujarati = 'ગુજરાતી',
  hindi = 'हिन्दी',
}

const initialState: AuthState = {
  user: {
    name: '',
    email: '',
    userRole: undefined,
    userId: 0,
    token: '',
  },
  currentLanguage: { id: 1, name: LanguageEnum.english, shortForm: 'en' },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState.user;
    },
    changeLanguage: (state, action: PayloadAction<LanguageProps>) => {
      state.currentLanguage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUserAction.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.user = formatAuthUser(action.payload?.data);
        AsyncStorage.setItem('token', state.user.token);
      },
    );
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.user = initialState.user;
      AsyncStorage.removeItem('token');
    });
  },
});

export const { logout, changeLanguage } = authSlice.actions;

export default authSlice.reducer;
