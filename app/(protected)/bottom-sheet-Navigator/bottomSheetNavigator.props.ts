export type BottomSheetNavigatorProps = {
  initialRouteName: string;
  onClosePress?: () => void;
};

export type BottomSheetCustomHeaderProps = {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
};
