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
    total: number;
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
export interface SettingsResponse {
  status: boolean;
  data: {
    log_type: string[];
    date_format: string;
    supported_file_format: {
      general: string;
      image: string;
      icon: string;
      video: string;
    };
    file_size: {
      general: number;
      image: number;
      icon: number;
      video: number;
    };
    supported_file_extension: {
      general: string;
      icon: string;
      video: string;
    };
    cache_data_limit: {
      seconds: number;
      days: number;
    };
    company_size: {
      [key: string]: string;
    };
    timeframe: {
      [key: string]: string;
    };
  };
}
