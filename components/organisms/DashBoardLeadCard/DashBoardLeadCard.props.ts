export interface DashBoardLeadCardProps {
  leadData: LeadData;
  onDelete: () => void;
}
export interface LeadData {
  id?: number;
  name: string;
  phone: number;
  email: string;
  createdAt: string;
  leadId?: number;
}
