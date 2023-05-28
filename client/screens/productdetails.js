import { Text, View } from "native-base";
import React from "react";

export const ProductDetails = ({ route, navigation }) => {
  return (
    <View>
      <Text>{route.params.name}</Text>
    </View>
  );
};
