import {
  countryList,
  leadChannelList,
  leadConversionList,
  leadStatusList,
  productServicesList,
} from '@api/general';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CountryListResponse,
  ProductServicesListResponse,
  leadGeneralListResponse,
} from '@type/api/general';
import { withToastForError } from '@utils/thunk';

export const leadChannelListAction = createAsyncThunk<
  leadGeneralListResponse,
  void
>(
  'general/leadChannelList',
  withToastForError(async () => {
    const response = await leadChannelList();
    return response.data;
  }),
);

export const leadConversionListAction = createAsyncThunk<
  leadGeneralListResponse,
  void
>(
  'general/leadConversionList',
  withToastForError(async () => {
    const response = await leadConversionList();
    return response.data;
  }),
);

export const leadStatusListAction = createAsyncThunk<
  leadGeneralListResponse,
  void
>(
  'general/leadStatusList',
  withToastForError(async () => {
    const response = await leadStatusList();
    return response.data;
  }),
);

export const productServicesListAction = createAsyncThunk<
  ProductServicesListResponse,
  void
>(
  'general/productServicesList',
  withToastForError(async () => {
    const response = await productServicesList();
    return response.data;
  }),
);

export const countryListAction = createAsyncThunk<CountryListResponse, void>(
  'general/countryList',
  withToastForError(async () => {
    const response = await countryList();
    return response.data;
  }),
);
