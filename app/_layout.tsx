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

const RootStack = () => {
  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootContainer>
        <StatusBar style="light" />
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <ToastProviderContainer>
                <BottomSheetModalProvider>
                  <View style={{ flex: 1 }}>
                    <Stack
                      initialRouteName="(public)/login/index"
                      screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="(public)/login/index" />
                      <Stack.Screen name="(protected)/(tabs)/dashboard" />
                    </Stack>
                  </View>
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
