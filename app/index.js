import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { token } from "../constant";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return isLoggedIn ? (
    <Redirect href="/(protected)/(drawer)/(tabs)/dashboard" />
  ) : (
    <Redirect href="/(public)/login" />
  );
};

export default Index;
