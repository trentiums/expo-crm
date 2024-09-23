import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';
import { Lead } from '@organisms/DashBoardLeadCard/DashBoardLeadCard.props';

export interface LeadDetailsProps {
  leadData: Lead;
  onDelete?: (id: number) => void;
  onEdit?: () => void;
  isDeleteLoading?: boolean;
  onChangeModalState?: (value: boolean) => void;
  showModal?: boolean;
  isServices?: boolean;
  onChangeDeleteId?: (value: number) => void;
  isSocialMediaVisible?: boolean;
  optionType?: ScreenOptionType;
  editRoute?: string;
  isShowLeadInfo?: boolean;
}
