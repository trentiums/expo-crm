import React, { useEffect } from 'react';
import { Redirect, SplashScreen } from 'expo-router';
SplashScreen.preventAutoHideAsync();
import { RootState, useSelector } from '@redux/store';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DNS,
  debug: true,
});

const App = () => {
  const token = useSelector((state: RootState) => state.auth.user.token);
  const handleSetToken = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await SplashScreen?.hideAsync();
  };
  useEffect(() => {
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
