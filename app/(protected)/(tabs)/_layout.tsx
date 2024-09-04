import React from 'react';
import { Tabs } from 'expo-router';
import DashboardIcon from '@atoms/Illustrations/Dashboard';
import { useAppTheme } from '@constants/theme';
import LeadsIcon from '@atoms/Illustrations/Leads';
import { AddLeadTabContainer, styles, TabLabelText } from './tabs.style';
import { RootState, useSelector } from '@redux/store';
import UsersIcon from '@atoms/Illustrations/Users';
import AddCircleIcon from '@atoms/Illustrations/addCircle';
import ProductIcon from '@atoms/Illustrations/Product';
import { useTranslation } from 'react-i18next';

const TabsLayout = () => {
  const { colors } = useAppTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation('tabs');

  const renderTabBarLabel = (focused: boolean, label: string) => {
    return <TabLabelText focused={focused}>{label}</TabLabelText>;
  };
  return (
    <Tabs
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.englishHolly,
        tabBarInactiveTintColor: colors.laurelGarland,
        tabBarStyle: [
          styles.barStyle,
          {
            backgroundColor: colors.white,
            borderTopWidth: 0,
            minHeight: 60,
            paddingBottom: 8,
          },
        ],
        tabBarLabelStyle: { fontSize: 12, marginTop: 4 },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerTitle: 'Dashboard',
          tabBarLabel: ({ focused }) =>
            renderTabBarLabel(focused, t('dashboard')),
          tabBarIcon: ({ focused }) => (
            <DashboardIcon
              color={focused ? colors.englishHolly : colors.americanSilver}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          title: 'Leads',
          headerTitle: 'Leads',
          tabBarLabel: ({ focused }) => renderTabBarLabel(focused, t('leads')),
          tabBarIcon: ({ focused }) => (
            <LeadsIcon
              color={focused ? colors.englishHolly : colors.americanSilver}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addLead"
        options={{
          title: '',
          headerTitle: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => {
            return (
              <AddLeadTabContainer>
                <AddCircleIcon color={colors.blueChaos} />
              </AddLeadTabContainer>
            );
          },
        }}
        redirect={user.userRole === 3}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          headerTitle: 'Users',
          tabBarLabel: ({ focused }) => renderTabBarLabel(focused, t('users')),
          tabBarIcon: ({ focused }) => (
            <UsersIcon
              color={focused ? colors.englishHolly : colors.americanSilver}
            />
          ),
        }}
        redirect={user.userRole === 3}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Services',
          headerTitle: 'Services',
          tabBarLabel: ({ focused }) =>
            renderTabBarLabel(focused, t('services')),
          tabBarIcon: ({ focused }) => (
            <ProductIcon
              color={focused ? colors.englishHolly : colors.americanSilver}
            />
          ),
        }}
        redirect={user.userRole === 3}
      />
    </Tabs>
  );
};

export default TabsLayout;
