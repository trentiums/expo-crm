import { Lead } from '@organisms/DashBoardLeadCard/DashBoardLeadCard.props';

export interface LeadDetailsProps {
  leadData: Lead;
  onDelete?: (id: number) => void;
  onEdit?: () => void;
  isDeleteLoading?: boolean;
  setShowModal?: (value: boolean) => void;
  showModal?: boolean;
  isServices?: boolean;
  setDeleteId?: (value: number) => void;
}
