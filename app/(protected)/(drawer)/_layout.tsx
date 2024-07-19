import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
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
  DrawerItemSection,
  DrawerNavigationView,
  LogoutText,
  UserImage,
  UserInfoSection,
  UserName,
} from "./drawer.style";

const DrawerLayout = () => {
  const { colors } = useAppTheme();
  const { t } = useTranslation("drawer");
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const userData = {
    name: user?.name,
    image:
      "https://media.istockphoto.com/id/587805156/vector/profile-picture-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=QjqBIsnahW5txrKJeIqLq53-b1PeYuSlG-zTAD1xsu4=",
  };

  return (
    <GestureHandlerRootView>
      <Drawer
        initialRouteName="dashboard"
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerNavigationView>
              <UserInfoSection>
                <UserImage source={{ uri: userData.image }} />
                <UserName>{user?.name ?? ""}</UserName>
              </UserInfoSection>
              <DrawerItem
                label="Dashboard"
                onPress={() => {
                  router.navigate("(tabs)/dashboard");
                }}
                labelStyle={{ color: colors.white }}
                icon={() => <Dashboard color={colors.white} />}
              />
              <DrawerItem
                label="Leads"
                onPress={() => {
                  router.navigate("(tabs)/leads");
                }}
                labelStyle={{ color: colors.white }}
                icon={() => <Leads color={colors.white} />}
              />
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
