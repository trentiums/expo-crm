import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import DrawerContent from '@molecules/DrawerContent/DrawerContent';

const DrawerLayout = () => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('drawer');

  return (
    <GestureHandlerRootView>
      <Drawer
        initialRouteName="dashboard"
        drawerContent={(props) => <DrawerContent />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: colors.tabBar,
            borderRadius: 8,
          },
        }}>
        <Drawer.Screen name="(tabs)" />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
