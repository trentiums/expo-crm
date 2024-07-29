import React from "react";
import { Tabs } from "expo-router";
import Dashboard from "@atoms/Illustrations/Dashboard";
import { useAppTheme } from "@constants/theme";
import Leads from "@atoms/Illustrations/Leads";
import { styles } from "../tabs.style";
import { RootState, useSelector } from "@redux/store";
import { userRole } from "@type/api/auth";
import Users from "@atoms/Illustrations/Users";

const TabsLayout = () => {
  const { colors } = useAppTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Tabs
      initialRouteName="dashboard"
      screenOptions={{
        headerTitle: () => null,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.lightGreen,
        tabBarStyle: [
          styles.barStyle,
          { backgroundColor: colors.tabBar, borderColor: colors.tabBar },
        ],
        tabBarLabelStyle: { fontSize: 12, marginBottom: 8 },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <Dashboard color={focused ? colors.lightGreen : colors.white} />
          ),
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          title: "Leads",
          tabBarIcon: ({ focused }) => (
            <Leads color={focused ? colors.lightGreen : colors.white} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
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
