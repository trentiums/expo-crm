import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";

const DrawerLayout = () => {
  const router = useRouter();
  const CustomDrawerContent = ({ props }) => (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={"Dashboard"}
        onPress={() => {
          router.push("/(drawer)/(tabs)/dashboard");
        }}
      />
      <DrawerItem
        label={"settings"}
        onPress={() => {
          router.push("/(drawer)/(tabs)/settings");
        }}
      />
    </DrawerContentScrollView>
  );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent props={undefined} {...props} />
        )}
        screenOptions={{
          headerShown: true,
          headerTitle: "CRM",
          headerTitleAlign: "center",
        }}>
        <Drawer.Screen
          name="dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Dashboard",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
