import React from 'react';
import { Stack } from 'expo-router';
import { useAppTheme } from '@constants/theme';

const ProtectedLayout = () => {
  const { colors } = useAppTheme();
  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: colors.white,
        headerShown: false,
      }}
      initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;
