import { OptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';

export type BottomSheetNavigatorProps = {
  initialRouteName: string;
  onClosePress?: () => void;
  extraInfo?: {
    leadId?: number;
    optionType?: OptionType;
  };
};

export type BottomSheetHeaderProps = {
  title: string;
  onClose: () => void;
  backVisible?: boolean;
  onBackPress?: () => void;
};
