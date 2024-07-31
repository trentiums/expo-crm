import React, { useEffect } from "react";
import { Redirect, SplashScreen } from "expo-router";
SplashScreen.preventAutoHideAsync();
import { RootState, useSelector } from "@redux/store";
import { setAuthenticationToken } from "@api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://46d8d8b7dd0180aeb0673685956609e1@o4507174888275968.ingest.de.sentry.io/4507690690216016",
  debug: true,
});

const Index = () => {
  const token = useSelector((state: RootState) => state.auth.user.token);
  const handleSetToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setAuthenticationToken(token);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    } finally {
      //here delay added bcz white screen is showing fraction of time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen?.hideAsync();
    }
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

export default Sentry.wrap(Index);
