import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  currentTheme: ThemeEnum;
}

export enum ThemeEnum {
  dark = 'dark',
  light = 'light',
}

const initialState: ThemeState = {
  currentTheme: ThemeEnum.light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (
      state,
      action: PayloadAction<ThemeEnum.dark | ThemeEnum.light>,
    ) => {
      state.currentTheme = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
