export interface DashboardLeadsProps {
  id: number;
  name: string;
  email: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeadStageCountLeadList {
  leadConversionId: number;
  name: string;
  leadCount: number;
}
