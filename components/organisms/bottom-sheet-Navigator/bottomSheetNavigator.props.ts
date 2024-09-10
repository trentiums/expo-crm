export type BottomSheetNavigatorProps = {
  initialRouteName: string;
  onClosePress?: () => void;
  extraInfo?: {
    leadId?: number;
  };
};

export type BottomSheetHeaderProps = {
  title: string;
  onClose: () => void;
  backVisible?: boolean;
  onBackPress?: () => void;
};
