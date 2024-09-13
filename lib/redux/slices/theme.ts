import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  currentTheme: ThemeTypes;
}

export enum ThemeTypes {
  dark = 'dark',
  light = 'light',
}

const initialState: ThemeState = {
  currentTheme: ThemeTypes.light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (
      state,
      action: PayloadAction<ThemeTypes.dark | ThemeTypes.light>,
    ) => {
      state.currentTheme = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
