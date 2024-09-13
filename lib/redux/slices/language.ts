import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LanguageState {
  currentLanguage: LanguageProps;
}

export interface LanguageProps {
  id: number;
  name: LanguageEnum;
  shortForm: string;
}
export enum LanguageEnum {
  english = 'English',
  gujarati = 'Gujarati',
  hindi = 'Hindi',
}

const initialState: LanguageState = {
  currentLanguage: { id: 1, name: LanguageEnum.english, shortForm: 'en' },
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LanguageProps>) => {
      state.currentLanguage = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
