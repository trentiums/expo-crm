export interface DashBoardLeadCardProps {
  leadData: Lead;
  isSocialMediaVisible?: boolean;
}
export interface Lead {
  id?: number;
  name: string;
  phone: number;
  email: string;
  createdAt: string;
  leadId?: number;
}
