import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import DashboardIcon from '@atoms/Illustrations/Dashboard';
import { useAppTheme } from '@constants/theme';
import LeadsIcon from '@atoms/Illustrations/Leads';
import { CreateOptionTabContainer, styles, TabLabel } from './tabs.style';
import { RootState, useSelector } from '@redux/store';
import UsersIcon from '@atoms/Illustrations/Users';
import AddCircleIcon from '@atoms/Illustrations/addCircle';
import ProductIcon from '@atoms/Illustrations/Product';
import { useTranslation } from 'react-i18next';
import BottomSheetNavigator from '../../../components/organisms/bottom-sheet-Navigator/bottomSheetNavigator';
import { UserRole } from '@type/api/auth';

const TabsLayout = () => {
  const { colors } = useAppTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const [visibleCreateOptionSheet, setVisibleCreateOptionSheet] =
    useState(false);
  const { t } = useTranslation('tabs');

  const renderTabBarLabel = (focused: boolean, label: string) => {
    return <TabLabel focused={focused}>{label}</TabLabel>;
  };

  const handleAddLeadPress = () => {
    setVisibleCreateOptionSheet(!visibleCreateOptionSheet);
  };

  return (
    <>
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
            },
          ],
          tabBarLabelStyle: styles.barLabelStyle,
        }}>
        <Tabs.Screen
          name="dashboard"
          options={{
            title: t('dashboard'),
            headerTitle: t('dashboard'),
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
            title: t('leads'),
            headerTitle: t('leads'),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel(focused, t('leads')),
            tabBarIcon: ({ focused }) => (
              <LeadsIcon
                color={focused ? colors.englishHolly : colors.americanSilver}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create-new"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: () => (
              <CreateOptionTabContainer onPress={handleAddLeadPress}>
                <AddCircleIcon color={colors.blueChaos} />
              </CreateOptionTabContainer>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleAddLeadPress();
            },
          }}
          redirect={user.userRole === UserRole.CompanyStaff}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: t('users'),
            headerTitle: t('users'),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel(focused, t('users')),
            tabBarIcon: ({ focused }) => (
              <UsersIcon
                color={focused ? colors.englishHolly : colors.americanSilver}
              />
            ),
          }}
          redirect={user.userRole === UserRole.CompanyStaff}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: t('services'),
            headerTitle: t('services'),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel(focused, t('services')),
            tabBarIcon: ({ focused }) => (
              <ProductIcon
                color={focused ? colors.englishHolly : colors.americanSilver}
              />
            ),
          }}
          redirect={user.userRole === UserRole.CompanyStaff}
        />
      </Tabs>

      {visibleCreateOptionSheet && (
        <BottomSheetNavigator
          initialRouteName="BottomSheetCreateOption"
          onClosePress={handleAddLeadPress}
        />
      )}
    </>
  );
};

export default TabsLayout;
