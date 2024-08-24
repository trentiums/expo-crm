import React from 'react';
import { router, Tabs, useNavigation } from 'expo-router';
import Dashboard from '@atoms/Illustrations/Dashboard';
import { useAppTheme } from '@constants/theme';
import Leads from '@atoms/Illustrations/Leads';
import { styles } from '../tabs.style';
import { RootState, useSelector } from '@redux/store';
import Users from '@atoms/Illustrations/Users';
import { IconButton } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';

const TabsLayout = () => {
  const { colors } = useAppTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation();

  const renderDrawerMenuButton = () => {
    return (
      <IconButton
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        icon="menu"
        size={24}
        iconColor={colors.white}
      />
    );
  };

  return (
    <Tabs
      initialRouteName="dashboard"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.white,
        headerLeft: renderDrawerMenuButton,
        headerStyle: {
          backgroundColor: colors.tabBar,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.lightGreen,
        tabBarStyle: [
          styles.barStyle,
          {
            backgroundColor: colors.tabBar,
            borderTopWidth: 0,
          },
        ],
        tabBarLabelStyle: { fontSize: 12, marginTop: 8 },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerTitle: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <Dashboard color={focused ? colors.lightGreen : colors.white} />
          ),
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          title: 'Leads',
          headerTitle: 'Leads',
          tabBarIcon: ({ focused }) => (
            <Leads color={focused ? colors.lightGreen : colors.white} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          headerTitle: 'Users',
          tabBarIcon: ({ focused }) => (
            <Users color={focused ? colors.lightGreen : colors.white} />
          ),
        }}
        redirect={user.userRole === 3}
      />
    </Tabs>
  );
};

export default TabsLayout;
