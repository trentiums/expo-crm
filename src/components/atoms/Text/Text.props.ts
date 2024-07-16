import { Text } from 'react-native-paper';

interface TextProps {
  color?: string;
}

export type LabelProps = React.ComponentProps<typeof Text> & TextProps;
