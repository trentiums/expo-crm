import {
  CountryType,
  CurrencyType,
  GeneralListResponse,
} from '@type/api/general';
import { GeneralList } from '@type/redux/slices/general';

export const formatGeneralList = (
  data: GeneralListResponse[],
): GeneralList[] => {
  return data?.map((item) => ({
    id: item?.id,
    name: item?.name,
    createdAt: item?.created_at,
    updatedAt: item?.updated_at,
    deletedAt: item?.deleted_at,
  }));
};
export const formatCountryList = (data: CountryType[]) => {
  return data?.map((item) => ({
    id: item.id,
    dialCode: item.dialling_code,
    countryCodeAlpha: item.country_code_alpha,
    name: item.full_name,
    flag: item.flag,
  }));
};
const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
};
export const convertKeysToCamelCase = (obj: unknown): unknown => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc: string, key: string) => {
      const camelCaseKey = toCamelCase(key);
      acc[camelCaseKey] = convertKeysToCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
export const formatCurrencyList = (data: CurrencyType[]) => {
  return data?.map((item) => ({
    id: item.id,
    currencyCodeAlpha: item.currency_code_alpha,
    currencySymbol: item.currency_symbol,
  }));
};
