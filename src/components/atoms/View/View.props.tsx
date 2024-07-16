import { View, ViewProps as RNViewProps } from 'react-native';

export type ViewProps = React.ComponentProps<typeof View> &
  RNViewProps & {
    row?: boolean;
    justifyCenter?: boolean;
    alignCenter?: boolean;
    flex?: boolean;
  };
