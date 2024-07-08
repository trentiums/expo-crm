import { ActivityIndicator, ActivityIndicatorProps } from 'react-native-paper';

export type LoaderProps = React.ComponentProps<typeof ActivityIndicator> &
  ActivityIndicatorProps;
