import { ApiResponse } from './api';

export interface GeneralListResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface leadGeneralListResponse extends ApiResponse {
  data: GeneralListResponse[];
}

export interface ProductServicesResponse {
  id: number;
  name: string;
  description: string;
  documents: any;
  media: any[];
}

export interface ProductServicesListResponse extends ApiResponse {
  data: {
    current_page: number;
    last_page: number;
    per_page: number;
    data: ProductServicesResponse[];
  };
}
export interface CountryType {
  id: number;
  full_name: string;
  dialling_code: string;
  country_code_alpha: string;
  flag: string;
}
export interface CountryListResponse {
  status: boolean;
  message: string;
  data: CountryType[];
}
