import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { token } from "../constant";
import ThemeProvider from "../src/containers/ThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import store from "@redux/store";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
    console.log("hello from token");
  }, [token]);

  return (
    <ReduxProvider store={store}>
      {isLoggedIn ? (
        <Redirect href="/(protected)/(drawer)/(tabs)/dashboard" />
      ) : (
        <Redirect href="/(public)/login" />
      )}
    </ReduxProvider>
  );
};

export default Index;
