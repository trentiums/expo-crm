import * as SplashScreen from "expo-splash-screen";
import RootStack from "./app/_layout";
import { useEffect, useState } from "react";
import React from "react";
import { GestureHandlerRootContainer } from "./App.styles";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./containers/ThemeProvider";
import ToastProviderContainer from "./components/molecules/Toast/Toast";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "@molecules/NoInternet/NoInternet";

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
      console.log("hello", store);
    };
  }, []);

  return (
    <GestureHandlerRootContainer>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ToastProviderContainer>
              <BottomSheetModalProvider>
                {isConnected ? <RootStack /> : <NoInternet />}
              </BottomSheetModalProvider>
            </ToastProviderContainer>
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootContainer>
  );
}
