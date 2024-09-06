export type BottomSheetNavigatorProps = {
  initialRouteName: string;
  onClosePress?: () => void;
};

export type BottomSheetHeaderProps = {
  title: string;
  onClose: () => void;
  backVisible?: boolean;
  onBackPress?: () => void;
};
