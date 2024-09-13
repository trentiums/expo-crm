import { api } from './api';
import { AxiosPromise } from 'axios';
import {
  CountryListResponse,
  ProductServicesListResponse,
  SettingsResponse,
  leadGeneralListResponse,
} from '@type/api/general';

export const leadChannelList = (): AxiosPromise<leadGeneralListResponse> =>
  api.get(`/lead-channel-list`);
export const leadConversionList = (): AxiosPromise<leadGeneralListResponse> =>
  api.get(`/lead-conversion-list`);
export const leadStatusList = (): AxiosPromise<leadGeneralListResponse> =>
  api.get(`/lead-status-list`);
export const productServicesList =
  (): AxiosPromise<ProductServicesListResponse> =>
    api.get(`/product-services-list`);

export const countryList = (): AxiosPromise<CountryListResponse> =>
  api.get(`/country-list`);
export const settings = (): AxiosPromise<SettingsResponse> =>
  api.get('/setting-list');
