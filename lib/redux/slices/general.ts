import { logoutUserAction } from '@redux/actions/auth';
import {
  countryListAction,
  currencyListAction,
  leadChannelListAction,
  leadConversionListAction,
  leadStatusListAction,
  settingsListAction,
} from '@redux/actions/general';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CountryListResponse,
  CurrencyListResponse,
  leadGeneralListResponse,
} from '@type/api/general';
import {
  CountryListType,
  CurrencyListType,
  GeneralList,
  SettingType,
} from '@type/redux/slices/general';
import {
  convertKeysToCamelCase,
  formatCountryList,
  formatCurrencyList,
  formatGeneralList,
} from '@utils/general';

export interface GeneralState {
  leadChannelList: GeneralList[];
  leadConversionList: GeneralList[];
  leadStatusList: GeneralList[];
  countryList: CountryListType[];
  settings: SettingType;
  currencyList: CurrencyListType[];
}

const initialState: GeneralState = {
  leadChannelList: [],
  leadConversionList: [],
  leadStatusList: [],
  countryList: [],
  settings: {},
  currencyList: [],
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      leadChannelListAction.fulfilled,
      (state, action: PayloadAction<leadGeneralListResponse>) => {
        state.leadChannelList = formatGeneralList(action.payload.data);
      },
    );
    builder.addCase(
      leadConversionListAction.fulfilled,
      (state, action: PayloadAction<leadGeneralListResponse>) => {
        state.leadConversionList = formatGeneralList(action.payload.data);
      },
    );
    builder.addCase(
      leadStatusListAction.fulfilled,
      (state, action: PayloadAction<leadGeneralListResponse>) => {
        state.leadStatusList = formatGeneralList(action.payload.data);
      },
    );
    builder.addCase(
      countryListAction.fulfilled,
      (state, action: PayloadAction<CountryListResponse>) => {
        state.countryList = formatCountryList(action.payload.data);
      },
    );
    builder.addCase(
      currencyListAction.fulfilled,
      (state, action: PayloadAction<CurrencyListResponse>) => {
        state.currencyList = formatCurrencyList(action.payload.data);
      },
    );

    builder.addCase(
      settingsListAction.fulfilled,
      (state, action: PayloadAction<CountryListResponse>) => {
        state.settings = convertKeysToCamelCase(action.payload.data);
      },
    );

    builder.addCase(logoutUserAction.fulfilled, () => {
      return initialState;
    });
  },
});

export const {} = generalSlice.actions;

export default generalSlice.reducer;
