import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';

export type BottomSheetNavigatorProps = {
  initialRouteName: string;
  onClosePress?: () => void;
  meta?: {
    leadId?: number;
    optionType?: ScreenOptionType;
    editRoute?: string;
    onDelete?: () => void;
  };
};

export type BottomSheetHeaderProps = {
  title: string;
  onClose: () => void;
  backVisible?: boolean;
  onBackPress?: () => void;
};
