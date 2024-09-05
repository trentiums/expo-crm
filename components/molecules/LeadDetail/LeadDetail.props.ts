import { Lead } from '@organisms/DashBoardLeadCard/DashBoardLeadCard.props';

export interface LeadDetailsProps {
  leadData: Lead;
  showSocialMedia?: boolean;
  isDeleteLoading?: boolean;
  onDelete: () => void;
  onEdit: () => void;
  showModal: Boolean;
  setShowModal?: (value: boolean) => void;
  setDeleteId?: (id: number) => void;
}
