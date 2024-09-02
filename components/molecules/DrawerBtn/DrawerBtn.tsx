import React from 'react';
import { useAppTheme } from '@constants/theme';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DrawerBtn = () => {
  const { colors } = useAppTheme();
  const { top } = useSafeAreaInsets();
  return (
    <IconButton
      onPress={() => router.navigate('/users')}
      icon="menu"
      size={24}
      iconColor={colors.black}
      style={{ marginTop: top }}
    />
  );
};

export default DrawerBtn;
