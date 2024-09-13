import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { LoaderProps } from './Loader.props';
import { useAppTheme } from '@constants/theme';
import { ViewStyle } from 'react-native';

const Loader: React.FC<LoaderProps> = ({ ...rest }) => {
  const { colors } = useAppTheme();
  const styeles: ViewStyle = {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  };
  return (
    <ActivityIndicator
      {...rest}
      animating={true}
      size={rest?.size || 'large'}
      color={rest?.color || colors.blueChaos}
      style={styeles}
    />
  );
};

export default Loader;
