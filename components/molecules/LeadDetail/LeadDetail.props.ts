import { LeadData } from '@organisms/DashBoardLeadCard/DashBoardLeadCard.props';

export interface LeadDetailsProps {
  leadData: LeadData;
  onDelete?: (id: number) => void;
  onEdit?: () => void;
  loading?: boolean;
  setShowModal?: (value: boolean) => void;
  showModal?: boolean;
  isServices?: boolean;
  setDeleteId?: (value: number) => void;
  showSocialMedia?: boolean;
}
