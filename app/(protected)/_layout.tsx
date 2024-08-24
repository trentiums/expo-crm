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
      }}
      initialRouteName="(drawer)">
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;
