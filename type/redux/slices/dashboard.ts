export interface DashboardLeadList {
  id: number;
  name: string;
  email: string;
  phone: number;
  createdAt: string;
}

export interface LeadStageCountLeadList {
  leadConversionId: number;
  name: string;
  leadCount: number;
}