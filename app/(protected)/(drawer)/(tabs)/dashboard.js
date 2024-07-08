import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Dashboard = () => {
  const navigation = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Dashboard</Text>
      <Pressable onPress={() => navigation?.navigate("/settings")}>
        <Text style={{ fontSize: 20 }}>Go To Settings</Text>
      </Pressable>
    </View>
  );
};

export default Dashboard;
