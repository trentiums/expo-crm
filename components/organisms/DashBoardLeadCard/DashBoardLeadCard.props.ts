export interface DashBoardLeadCardProps {
  leadData: Lead;
  isSocialMediaVisible?: boolean;
}
export interface Lead {
  leadStatusId: number;
  id?: number;
  name: string;
  phone: number;
  email: string;
  createdAt: string;
  leadId?: number;
}
