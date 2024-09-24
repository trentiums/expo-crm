import React from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { View } from 'react-native';
import { GestureHandlerRootContainer } from '../App.styles';
import store, { persistor } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Provider as ReduxProvider } from 'react-redux';
import '../i18n/i18n';
import ThemeProvider from '../containers/ThemeProvider';
import ToastProviderContainer from '@molecules/Toast/Toast';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Flexed } from '@atoms/common/common.styles';

const RootStack = () => {
  const [fontsLoaded] = useFonts({
    'SF-Pro-Display-Ultralight_100': require('../assets/fonts/SF-Pro-Display-Ultralight.ttf'),
    'SF-Pro-Display-Thin_200': require('../assets/fonts/SF-Pro-Display-Thin.ttf'),
    'SF-Pro-Display-Light_300': require('../assets/fonts/SF-Pro-Display-Light.ttf'),
    'SF-Pro-Display-Regular_400': require('../assets/fonts/SF-Pro-Display-Regular.ttf'),
    'SF-Pro-Display-Medium_500': require('../assets/fonts/SF-Pro-Display-Medium.ttf'),
    'SF-Pro-Display-Semibold_600': require('../assets/fonts/SF-Pro-Display-Semibold.ttf'),
    'SF-Pro-Display-Bold_700': require('../assets/fonts/SF-Pro-Display-Bold.ttf'),
    'SF-Pro-Display-Heavy_800': require('../assets/fonts/SF-Pro-Display-Heavy.ttf'),
    'SF-Pro-Display-Black_900': require('../assets/fonts/SF-Pro-Display-Black.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootContainer>
        <StatusBar style="auto" />
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <ToastProviderContainer>
                <BottomSheetModalProvider>
                  <Flexed>
                    <Stack
                      initialRouteName="(public)/login/index"
                      screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="(public)/login/index" />
                      <Stack.Screen name="(protected)/(tabs)/dashboard" />
                    </Stack>
                  </Flexed>
                </BottomSheetModalProvider>
              </ToastProviderContainer>
            </ThemeProvider>
          </PersistGate>
        </ReduxProvider>
      </GestureHandlerRootContainer>
    </BottomSheetModalProvider>
  );
};

export default RootStack;
