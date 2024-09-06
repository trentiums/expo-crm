import { SafeAreaViewProps } from 'react-native-safe-area-context';

export type ScreenTemplateProps = {
  children: React.ReactNode;
  safeAreaProps?: SafeAreaViewProps;
  backgroundColor?: string;
  addButtonText?: string;
  moreVisible?: boolean;
  onAddButtonPress?: () => void;
  title?: string;
};
