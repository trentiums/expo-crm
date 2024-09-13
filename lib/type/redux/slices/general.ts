export interface GeneralList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface CountryListType {
  id: number;
  name: string;
  dialCode: string;
  countryCodeAlpha: string;
  flag: string;
}
export interface CurrencyListType {
  id: number;
  currencyCodeAlpha: string;
  currencySymbol: string;
}
