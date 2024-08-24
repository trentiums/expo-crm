import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useAppTheme } from "@constants/theme";
import Dashboard from "@atoms/Illustrations/Dashboard";
import Leads from "@atoms/Illustrations/Leads";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import { Spacer } from "@atoms/common/common.styles";
import { logoutUserAction } from "@redux/actions/auth";
import { Linking, Pressable } from "react-native";
import {
  CompanyText,
  DrawerBottomSection,
  DrawerNavigationView,
  LogoutText,
  UserInfoSection,
  UserName,
} from "./drawer.style";
import Users from "@atoms/Illustrations/Users";
import { userRole } from "@type/api/auth";
import View from "@atoms/View/View";
import DrawerContent from "@molecules/DrawerContent/DrawerContent";

const DrawerLayout = () => {
  const { colors } = useAppTheme();
  const { t } = useTranslation("drawer");
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const userData = {
    name: user.name,
  };

  return (
    <GestureHandlerRootView>
      <Drawer
        initialRouteName="dashboard"
        drawerContent={(props) => <DrawerContent />}
        screenOptions={{
          headerTitle: "CRM",
          headerTitleAlign: "center",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.tabBar,
            borderBottomWidth: 0,
            shadowOpacity: 0,
            elevation: 0,
          },
          drawerItemStyle: {
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1,
          },
          drawerStyle: {
            backgroundColor: colors.tabBar,
          },
          drawerActiveTintColor: colors.white,
          drawerInactiveTintColor: colors.white,
          drawerActiveBackgroundColor: "transparent",
          // headerRight: () => <CustomHeaderRight />,
        }}
      >
        <Drawer.Screen name="(tabs)" />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
