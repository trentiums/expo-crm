import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';

export type BottomSheetNavigatorProps = {
  initialRouteName: string;
  onClosePress?: () => void;
  meta?: {
    leadId?: number;
    optionType?: ScreenOptionType;
  };
};

export type BottomSheetHeaderProps = {
  title: string;
  onClose: () => void;
  backVisible?: boolean;
  onBackPress?: () => void;
};
