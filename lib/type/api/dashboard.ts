import { ApiResponse } from "./api";

export interface DashboardLeadListItem {
  id: number;
  name: string;
  email: string;
  phone: number;
  created_at: string;
}

export interface DashboardLeadListItem {
  id: number;
  name: string;
  email: string;
  phone: number;
  updated_at?: string;
  created_at: string;
}

export interface LeadStageCountLeadListItem {
  lead_conversion_id: number;
  name: string;
  lead_count: number;
}

export interface DashboardLeadListResponse extends ApiResponse {
  data: {
    current_page: number;
    last_page: number;
    per_page: number;
    data: DashboardLeadListItem[];
  };
}

export interface DashboardLeadStageCountResponse extends ApiResponse {
  data: LeadStageCountLeadListItem[];
}

export interface DashboardLeadListParams {
  page?: number;
}
