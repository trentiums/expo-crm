import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";

const RootStack = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        initialRouteName="(public)/login/index"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)/login\index" />
        <Stack.Screen name="(protected)/(drawer)/(tabs)/dashboard" />
      </Stack>
    </View>
  );
};

export default RootStack;
