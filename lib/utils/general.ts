import { CountryType, GeneralListResponse } from '@type/api/general';
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
