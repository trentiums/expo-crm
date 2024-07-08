import { StyleProp, TextStyle } from 'react-native';

export type FormErrorProps = {
  errorId?: string;
  text?: string;
  compact?: boolean;
  visible?: boolean;
  padding?: 'none' | 'normal';
  style?: StyleProp<TextStyle>;
};
