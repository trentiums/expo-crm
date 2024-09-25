import React from 'react';
import { useAppTheme } from '@constants/theme';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';

const MoreMenuButton = () => {
  const { colors } = useAppTheme();
  return (
    <IconButton
      onPress={() => router.navigate('/(protected)/more-menu')}
      icon="menu"
      size={24}
      iconColor={colors.black}
    />
  );
};

export default MoreMenuButton;
