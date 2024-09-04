export type BottomSheetNavigatorProps = {
  initialRouteName: string;
};

export type BottomSheetCustomHeaderProps = {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
};
