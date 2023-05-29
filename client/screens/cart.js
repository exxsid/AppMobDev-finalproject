import { FlatList, Box, Heading, HStack, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  StyleSheet,
} from "react-native";

import { AppBar } from "../components/appbar";
import cartlist from "../constants/cartlist";
import color from "../constants/color";
import { ProductCard } from "../components/productcard";

const screen = Dimensions.get("screen");

export const Cart = ({ navigation }) => {
  const [cartList, setCartList] = useState(cartlist);

  const navigateToProductDetails = (item) => {
    navigation.push("Product Details", {
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      stock: item.stock,
      category: item.category,
      image: item.image,
      orderQtty: item.orderQtty,
    });
  };

  const refreshCartList = () => {
    const newData = [...cartlist];
    setCartList(newData);
  };

  const handleClearCartButton = () => {
    cartlist.length = 0;
    const newData = [...cartlist];
    setCartList(newData);
  };

  return (
    <>
      <AppBar title="Cart"></AppBar>
      <HStack justifyContent={"flex-end"} space={5} p={4} bg={color.background}>
        <TouchableOpacity
          onPress={refreshCartList}
          style={styles.refreshButton}
        >
          <Text style={{ color: color.textlight }}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Clear Cart",
              "Are you sure you want to clear the cart?",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: handleClearCartButton,
                },
              ]
            )
          }
          style={styles.clearCartButton}
        >
          <Text>Clear Cart</Text>
        </TouchableOpacity>
      </HStack>
      <Box
        bg={color.background}
        flex={1}
        alignItems={"center"}
        width={screen.width}
      >
        <FlatList
          flex={1}
          data={cartList}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
              <ProductCard
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                unit={item.unit}
                stock={item.stock_quantity}
                category={item.category_id}
                imageLink={item.image}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.5}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          extraData={cartList}
        />
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  refreshButton: {
    padding: 5,
    backgroundColor: "#00755e",
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10, // Add elevation for shadow effect on Android
    shadowColor: "rgba(0, 0, 0, 0.3)", // Shadow color for iOS
    shadowOpacity: 1, // Shadow opacity for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
  clearCartButton: {
    padding: 5,
    backgroundColor: "#dfe0df",
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10, // Add elevation for shadow effect on Android
    shadowColor: "rgba(0, 0, 0, 0.3)", // Shadow color for iOS
    shadowOpacity: 1, // Shadow opacity for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
});
