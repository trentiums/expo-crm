import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  currentTheme: string;
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: true,
  currentTheme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<'dark' | 'default'>) => {
      state.currentTheme = action.payload;
      state.isDark = action.payload === 'dark';
    },
  },
  extraReducers(builder) {},
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
