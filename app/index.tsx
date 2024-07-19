import React from "react";
import { Redirect } from "expo-router";
import { RootState, useSelector } from "@redux/store";

const Index = () => {
  const token = useSelector((state: RootState) => state.auth.user.token);
  return (
    <>
      {token ? (
        <Redirect href="/(protected)/(drawer)/(tabs)/leads" />
      ) : (
        <Redirect href="/(public)/login" />
      )}
    </>
  );
};

export default Index;
