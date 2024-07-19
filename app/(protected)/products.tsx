import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import { router } from "expo-router";
import React from "react";

const products = () => {
  return (
    <ScreenTemplate
      addButtonText="Products"
      onAddButtonPress={() => router.navigate("/addProduct")}>
      <View>
        <Text>Products Listing</Text>
      </View>
    </ScreenTemplate>
  );
};

export default products;
