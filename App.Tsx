import * as SplashScreen from "expo-splash-screen";
import RootStack from "./app/_layout";
import { useEffect, useState } from "react";
import React from "react";
import { GestureHandlerRootContainer } from "./App.styles";
import NetInfo from "@react-native-community/netinfo";
import "./i18n/i18n";
import NoInternet from "./components/molecules/NoInternet/NoInternet";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      (state: { isConnected: boolean | null }) => {
        return setIsConnected(state.isConnected);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootContainer>
      {isConnected ? <RootStack /> : <NoInternet />}
    </GestureHandlerRootContainer>
  );
}
