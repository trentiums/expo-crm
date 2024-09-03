export interface DashBoardLeadCardProps {
  leadData: Lead;
  onDelete: () => void;
}
export interface Lead {
  id?: number;
  name: string;
  phone: number;
  email: string;
  createdAt: string;
  leadId?: number;
}
