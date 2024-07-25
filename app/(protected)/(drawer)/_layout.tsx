import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
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
        drawerContent={(props) => (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flex: 1 }}>
            <DrawerNavigationView>
              <View>
                <UserInfoSection>
                  <UserName>{userData.name}</UserName>
                </UserInfoSection>
                <DrawerItem
                  label="Dashboard"
                  onPress={() => {
                    router.navigate("(tabs)/dashboard");
                  }}
                  labelStyle={{ color: colors.white }}
                  icon={() => <Dashboard color={colors.white} />}
                  style={{
                    borderColor: colors.gray,
                    borderBottomWidth: 1,
                  }}
                />
                <DrawerItem
                  label="Leads"
                  onPress={() => {
                    router.navigate("(tabs)/leads");
                  }}
                  labelStyle={{ color: colors.white }}
                  icon={() => <Leads color={colors.white} />}
                  style={{
                    borderColor: colors.gray,
                    borderBottomWidth: 1,
                  }}
                />
                {user.userRole !== userRole.CompanyStaff && (
                  <DrawerItem
                    label="Users"
                    onPress={() => {
                      router.navigate("(tabs)/users");
                    }}
                    labelStyle={{ color: colors.white }}
                    icon={() => <Users color={colors.white} />}
                    style={{
                      borderColor: colors.gray,
                      borderBottomWidth: 1,
                    }}
                  />
                )}
                <DrawerItem
                  label={t("products")}
                  onPress={() => {
                    router.navigate("/products");
                  }}
                  labelStyle={{ color: colors.white }}
                  icon={() => <Users color={colors.white} />}
                  style={{
                    borderColor: colors.gray,
                    borderBottomWidth: 1,
                  }}
                />
              </View>
              <DrawerBottomSection>
                <Pressable
                  onPress={async () => {
                    try {
                      await dispatch(logoutUserAction()).unwrap();
                      router.replace("/(public)/login");
                    } catch (error) {
                      console.log("error: ", error);
                    }
                  }}>
                  <LogoutText>{t("logout")}</LogoutText>
                </Pressable>
                <Spacer size={16} />
                <Pressable
                  onPress={() => Linking.openURL("https://www.trentiums.com/")}>
                  <CompanyText>{t("poweredByTrentiums")}</CompanyText>
                </Pressable>
              </DrawerBottomSection>
            </DrawerNavigationView>
          </DrawerContentScrollView>
        )}
        screenOptions={{
          headerTitle: "CRM",
          headerTitleAlign: "center",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.darkBackground,
          },
          drawerItemStyle: {
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1,
          },
          drawerStyle: {
            backgroundColor: colors.darkBackground,
          },
          drawerActiveTintColor: colors.white,
          drawerInactiveTintColor: colors.white,
          drawerActiveBackgroundColor: "transparent",
          // headerRight: () => <CustomHeaderRight />,
        }}>
        <Drawer.Screen name="(tabs)" />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
