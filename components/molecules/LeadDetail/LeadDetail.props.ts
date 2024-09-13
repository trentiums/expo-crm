import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';
import { Lead } from '@organisms/DashBoardLeadCard/DashBoardLeadCard.props';

export interface LeadDetailsProps {
  leadData: Lead;
  isSocialMediaVisible?: boolean;
  optionType?: ScreenOptionType;
  onDelete?: () => void;
  editRoute?: string;
}
