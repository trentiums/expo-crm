import React, { useEffect } from "react";
import { Redirect, SplashScreen } from "expo-router";
import { RootState, useSelector } from "@redux/store";
import { setAuthenticationToken } from "@api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const token = useSelector((state: RootState) => state.auth.user.token);
  const handleSetToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setAuthenticationToken(token);
    }
    SplashScreen.hideAsync();
  };
  useEffect(() => {
    handleSetToken();
  }, [token]);
  return (
    <>
      {token ? (
        <Redirect href="/(protected)/(drawer)/(tabs)/dashboard" />
      ) : (
        <Redirect href="/(public)/login" />
      )}
    </>
  );
};

export default Index;
