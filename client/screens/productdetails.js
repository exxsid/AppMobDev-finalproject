import {
  Center,
  Text,
  View,
  Box,
  Image,
  AspectRatio,
  Heading,
  ScrollView,
  Stack,
  HStack,
  IconButton,
  Icon,
  Input,
  Button,
} from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, StyleSheet, Alert } from "react-native";
import { useState } from "react";

import { AppBar } from "../components/appbar";
import color from "../constants/color";
import cartlist from "../constants/cartlist";

export const ProductDetails = ({ route, navigation }) => {
  const order =
    route.params.orderQtty == null ? "1" : route.params.orderQtty.toString();
  const [orderQuantity, setOrderQuantity] = useState(order);

  const orderQuantityOnChange = (text) => {
    const maxValue = route.params.stock;
    const input = parseInt(text);
    if (input > maxValue) {
      setOrderQuantity("1");
      alert("Input must not be greater than the stock");
      return;
    }
    setOrderQuantity(input.toString());
  };

  const handleAddButton = () => {
    const maxValue = route.params.stock;
    const currentValue = parseInt(orderQuantity);
    const newValue = currentValue + 1;
    if (newValue > maxValue) {
      setOrderQuantity("1");
      alert("Input must not be greater than the stock");
      return;
    }
    setOrderQuantity(newValue.toString());
  };

  const handleMinusButton = () => {
    const currentValue = parseInt(orderQuantity);
    const newValue = currentValue - 1;
    if (newValue < 1) {
      setOrderQuantity("1");
      alert("Input must not be less than 1");
      return;
    }
    setOrderQuantity(newValue.toString());
  };

  const handleAddToCartButton = () => {
    const newItem = {
      id: route.params.id,
      name: route.params.name,
      price: route.params.price,
      quantity: route.params.quantity,
      unit: route.params.unit,
      stock: route.params.stock,
      category: route.params.category,
      image: route.params.image,
      orderQtty: parseInt(orderQuantity),
    };
    if (route.params.previousScreen === "Home") {
      const existingItem = cartlist.find((item) => item.id == newItem.id);

      if (existingItem) {
        existingItem.orderQtty += newItem.orderQtty;
      } else {
        cartlist.push(newItem);
      }
      console.log(cartlist);
    } else {
      // cart
      const existingItem = cartlist.find((item) => item.id == newItem.id);

      if (existingItem) {
        existingItem.orderQtty = newItem.orderQtty;
      } else {
        cartlist.push(newItem);
      }
      console.log(cartlist);
    }

    Alert.alert("Adding to cart success", "", [
      {
        text: "Okay",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <>
      <AppBar
        title="Product Details"
        leadingButton={{
          isLeading: true,
          leadingCBF: () => navigation.goBack(),
        }}
      />
      <Box bg={color.card} flex={1}>
        <ScrollView>
          <Center>
            <AspectRatio w="100%" ratio={1}>
              <Image
                source={{
                  uri: route.params.image,
                }}
                alt="image"
                fallbackSource={{
                  uri: "https://i.pinimg.com/736x/4f/db/53/4fdb536da5448f61bab84eb96d339c6f.jpg",
                }}
                mb={3}
              />
            </AspectRatio>
          </Center>
          <Stack p="4" space={3}>
            <Stack>
              <Heading size="2xl" ml="-1" color={color.textdark}>
                {route.params.name}
              </Heading>
              {/* price quantity per unit */}
              <Text italic bold fontSize={"xl"} color={color.textlight}>
                PhP {route.params.price.toFixed(2)}/{route.params.unit}
              </Text>
              <Text color={color.textlight} fontSize={"lg"}>
                {route.params.orderQtty == null
                  ? route.params.stock
                  : route.params.orderQtty}{" "}
                {route.params.unit}
              </Text>
              <Text color={color.textlight} fontSize={"lg"}>
                {route.params.category}
              </Text>
            </Stack>
          </Stack>
        </ScrollView>
        <Box
          bg={color.background}
          w={"full"}
          h={"16"}
          justifyContent={"space-evenly"}
          borderTopWidth={1}
          borderTopColor={color.primary}
        >
          <HStack justifyContent={"space-around"} flex={1} px={3}>
            <HStack
              flex={1}
              alignSelf={"center"}
              space={1}
              alignContent={"center"}
            >
              <IconButton
                icon={
                  <Icon
                    as={Ionicons}
                    name="ios-remove-circle-outline"
                    color={color.textdark}
                    size={"lg"}
                  />
                }
                onPress={handleMinusButton}
              />
              <TextInput
                value={orderQuantity}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={orderQuantityOnChange}
              />
              <IconButton
                icon={
                  <Icon
                    as={Ionicons}
                    name="ios-add-circle-outline"
                    color={color.textdark}
                    size={"lg"}
                  />
                }
                onPress={handleAddButton}
              />
              <Center flexDirection={"row"}>
                <Text bold fontSize={"md"}>
                  Total:{" "}
                  {(parseInt(orderQuantity) * route.params.price).toFixed(2)}
                </Text>
              </Center>
            </HStack>

            <Button
              bg={color.primary}
              my={3}
              _text={{ color: color.textlight }}
              onPress={handleAddToCartButton}
            >
              Add To Cart
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    width: "8%",
    padding: 5,
  },
});
