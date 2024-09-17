import { Text } from 'react-native-paper';

interface TextProps {
  color?: string;
  variant?:
    | 'SF-Pro-Display-Ultralight_100'
    | 'SF-Pro-Display-Thin_200'
    | 'SF-Pro-Display-Light_300'
    | 'SF-Pro-Display-Regular_400'
    | 'SF-Pro-Display-Medium_500'
    | 'SF-Pro-Display-Semibold_600'
    | 'SF-Pro-Display-Bold_700'
    | 'SF-Pro-Display-Heavy_800'
    | 'SF-Pro-Display-Black_900';
}

export type LabelProps = React.ComponentProps<typeof Text> & TextProps;
