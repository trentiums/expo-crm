import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
import * as Sentry from '@sentry/react-native';
import { useNavigationContainerRef } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../components/molecules/NoInternet/NoInternet';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
  enableTimeToInitialDisplay: true,
  routeChangeTimeoutMs: 1000,
});

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DNS,
  debug: __DEV__ ? false : true,
  maxBreadcrumbs: 50,
  enableSpotlight: __DEV__ ? false : true,
  tracesSampleRate: 1.0,
  enableAutoSessionTracking: __DEV__ ? false : true,
  enableAutoPerformanceTracing: __DEV__ ? false : true,
  _experiments: {
    profilesSampleRate: 1.0,
  },
  enableTracing: __DEV__ ? false : true,
  autoSessionTracking: __DEV__ ? false : true,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      tracingOrigins: ['localhost', /^\//],
    }),
  ],
});

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

  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      (state: { isConnected: boolean | null }) => {
        return setIsConnected(state?.isConnected);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <ToastProviderContainer>
                <BottomSheetModalProvider>
                  <Flexed>
                    {isConnected ? (
                      <Stack
                        initialRouteName="(public)/login/index"
                        screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(public)/login/index" />
                        <Stack.Screen name="(protected)/(tabs)/dashboard" />
                      </Stack>
                    ) : (
                      <NoInternet />
                    )}
                  </Flexed>
                </BottomSheetModalProvider>
              </ToastProviderContainer>
            </ThemeProvider>
          </PersistGate>
        </ReduxProvider>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

export default Sentry.wrap(RootStack);
