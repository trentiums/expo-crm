import { fileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';

export interface SaveLeadParams {
  name: string;
  email: string;
  country_code_alpha?: string | number;
  phone?: number;
  company_name?: string;
  company_size?: number | string;
  company_website?: string;
  lead_status_id: number;
  lead_channel_id: number;
  product_services: number[];
  lead_conversion_id: number;
  budget?: string | number;
  time_line?: string;
  description?: string;
  deal_amount?: string | number;
  win_close_reason?: string;
  deal_close_date?: Date | string;
  documents?: File;
}
export interface LeadListParams {
  start_date?: Date | string;
  end_date?: Date | string;
  order_by?: ORDERBY;
  sort_order?: SORTORDER;
  page?: number;
  search?: string;
  lead_status_id?: number;
  lead_channel_id?: number | number[];
  lead_conversion_id?: number;
}
export enum ORDERBY {
  CREATED_AT = 1,
  NAME = 2,
  EMAIL3 = 3,
  COMPANY_USER_ID = 4,
}
export enum SORTORDER {
  ASC = 1,
  DSC = 2,
}

export interface MediaResponse {
  id: number;
  created_at: string;
  updated_at: string;
  original_url: string;
}
export interface ProductServiceResponse {
  id: number;
  company_user_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  documents: MediaResponse;
  pivot: {
    lead_id: number;
    product_service_id: number;
  };
  media: MediaResponse[];
}

export interface LeadListData {
  id: number;
  company_user_id: number;
  name: string;
  email: string;
  phone: number;
  company_name: string;
  company_size: string;
  company_website: string;
  budget: string;
  time_line: string;
  description: string;
  deal_amount: string;
  win_close_reason: string;
  deal_close_date: string;
  lead_status_id: number;
  lead_channel_id: number;
  lead_conversion_id: number;
  country_id: number;
  product_services: ProductServiceResponse[];
  created_at: string;
  updated_at: string;
  documents: DocumentTye[];
  assign_from_user_id?: number;
  assign_to_user_id?: number;
}

export interface DocumentTye {
  uuid: string;
  original_url: string;
  mime_type: string;
  id: number;
  name: string;
  size: number;
}
export interface LeadListResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: LeadListData[];
  };
}

export interface ProductService {
  id: number;
  companyUserId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface LeadListState {
  id: number;
  companyUserId: number;
  name: string;
  email: string;
  phone: number;
  companyName: string;
  companySize: string;
  companyWebsite: string;
  budget: string;
  timeLine: string;
  description: string;
  dealAmount: string;
  winCloseReason: string;
  dealCloseDate: string;
  leadStatusId: number;
  leadChannelId: number;
  leadConversionId: number;
  countryId: number;
  productService: ProductService[];
  createdAt: string;
  updatedAt: string;
  webSite: string;
  documents: fileSystemProps[];
  assignTo?: number;
}

export interface LeadsFilterType {
  startDate: string;
  endDate: string;
  selectedChannel?: number;
  selectedStage?: number;
  selectedStatus?: number;
  orderBy?: number;
  sortBy?: number;
}

export interface DeleteLeadParams {
  lead_id: number;
}

export interface UpdateLeadParams {
  lead_id: number;
  name: string;
  email: string;
  country_code_alpha?: string | number;
  phone?: number;
  company_name?: string;
  company_size?: number | string;
  company_website?: string;
  lead_status_id: number;
  lead_channel_id: number;
  product_services: number[];
  lead_conversion_id: number;
  budget?: string | number;
  time_line?: string;
  description?: string;
  deal_amount?: string | number;
  win_close_reason?: string;
  deal_close_date?: Date | string;
  documents?: File;
}

export interface LeadListTypeState {
  id: number;
  companyUserId?: number;
  name: string;
  email: string;
  phone: number;
  companyName?: string;
  companySize?: string;
  companyWebsite?: string;
  budget?: string;
  timeLine?: string;
  description?: string;
  dealAmount?: string | number;
  winCloseReason?: string;
  dealCloseDate?: string | Date;
  leadStatusId: number;
  leadChannelId: number;
  leadConversionId: number;
  countryId?: number;
  productService: ProductService[];
  createdAt?: string;
  updatedAt?: string;
}
export interface DeleteLeadDocumentsParams {
  media_id: number;
}
export interface LeadDetailsParams {
  lead_id: number;
}

export interface LeadDetailsResponse {
  status: boolean;
  message: string;
  data: LeadListData;
}

export interface UpdateLeadStatusParams {
  lead_id: number;
  lead_status_id?: number;
  lead_channel_id?: number;
  lead_conversion_id?: number;
  type: updateLeadStatusTypes;
}

export enum updateLeadStatusTypes {
  STATUS = 1,
  CHANNEL = 2,
  CONVERSION = 3,
}
