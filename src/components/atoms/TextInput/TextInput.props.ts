import { TextInput as RNTextInput, TextInputProps } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export type CustomTextInputProps = React.ComponentProps<typeof RNTextInput> &
  TextInputProps & {
    labelColor?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
