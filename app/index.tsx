import React, { useEffect } from 'react';
import { Redirect, SplashScreen } from 'expo-router';
SplashScreen.preventAutoHideAsync();
import { RootState, useSelector } from '@redux/store';
import { setAuthenticationToken } from '@api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DNS,
  debug: true,
});

const App = () => {
  const token = useSelector((state: RootState) => state.auth.user.token);
  const handleSetToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthenticationToken(token);
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    } finally {
      //here delay added bcz white screen is showing fraction of time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen?.hideAsync();
    }
  };
  useEffect(() => {
    Sentry.captureException(new Error('This is a test error from Expo build'));
    handleSetToken();
  }, [token]);
  return (
    <>
      {token ? (
        <Redirect href="/(protected)/(tabs)/dashboard" />
      ) : (
        <Redirect href="/(public)/login" />
      )}
    </>
  );
};

export default Sentry.wrap(App);
