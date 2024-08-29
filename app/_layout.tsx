import React from 'react';
import { Stack } from 'expo-router';
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
import NotificationContainer from '../Notification';

const RootStack = () => {
  return (
    <GestureHandlerRootContainer>
      <StatusBar style="light" />

      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <NotificationContainer>
              <ToastProviderContainer>
                <BottomSheetModalProvider>
                  <Stack
                    initialRouteName="(public)/login/index"
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(public)/login/index" />
                    <Stack.Screen name="(protected)/(drawer)/(tabs)/dashboard" />
                  </Stack>
                </BottomSheetModalProvider>
              </ToastProviderContainer>
            </NotificationContainer>
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootContainer>
  );
};

export default RootStack;
