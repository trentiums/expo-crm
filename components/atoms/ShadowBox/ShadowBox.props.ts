import { ViewStyle } from 'react-native';

export interface shadowboxProps {
  children: React.JSX.Element;
  elevation?: number;
  radius?: number;
  shadowColor?: string;
  style?: ViewStyle;
  mode: 'bottom' | 'around';
}
