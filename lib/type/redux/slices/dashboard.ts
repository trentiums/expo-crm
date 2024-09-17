export interface DashboardLeadsProps {
  id: number;
  name: string;
  email: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
}
export interface DashboardAdminLeadsProps {
  id: number;
  name: string;
  total: number;
  initial: number;
  proposal: number;
  negotiation: number;
  closedWon: number;
  closedLost: number;
}
export interface LeadStageCountLeadList {
  leadConversionId: number;
  name: string;
  leadCount: number;
}
