export interface DashBoardLeadCardProps {
  leadData: Lead;
  onDelete: () => void;
  isShowSocialMedia?: boolean;
}
export interface Lead {
  id?: number;
  name: string;
  phone: number;
  email: string;
  createdAt: string;
  leadId?: number;
}
