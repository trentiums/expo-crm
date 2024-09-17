import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';

export type BottomSheetNavigatorProps = {
  initialRouteName: string;
  onClosePress?: () => void;
  meta?: {
    leadId?: number;
    optionType?: ScreenOptionType;
    dropdownData?: Dropdown[];
    handelSelectData?: (id: number) => void;
    heading?: string;
  };
};

export type BottomSheetHeaderProps = {
  title: string;
  onClose: () => void;
  backVisible?: boolean;
  onBackPress?: () => void;
};
export interface Dropdown {
  id: number;
  title: string;
  image?: string;
}
