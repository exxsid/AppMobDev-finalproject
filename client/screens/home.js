import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  Center,
  Flex,
  AspectRatio,
  Stack,
  Spacer,
  FlatList,
  Spinner,
} from "native-base";
import axios from "axios";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";

import { AppBar } from "../components/appbar";
import color from "../constants/color";
import { ProductCard } from "../components/productcard";

export const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://192.168.100.162:3000/products")
      .then((response) => response.json())
      .then((prods) => {
        setProducts(prods[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(true));
  });

  const navigateToProductDetails = (item) => {
    navigation.push("Product Details", {
      name: item.name,
    });
  };

  const renderLoadingSpinner = () => {
    return (
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color={color.primary} fontSize="lg">
          Loading
        </Heading>
      </HStack>
    );
  };

  return (
    <>
      <AppBar title="Home"></AppBar>
      <Box bg={color.background} flex={1} alignItems={"center"}>
        <Heading
          fontSize={"lg"}
          color={color.textdark}
          py={4}
          px={5}
          width={"full"}
          bg={color.background}
        >
          All Products
        </Heading>
        {loading ? (
          <FlatList
            flex={1}
            data={products}
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
          />
        ) : (
          renderLoadingSpinner()
        )}
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: "50%",
    aspectRatio: 1, // Adjust aspect ratio as needed
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

const data = [
  {
    id: 1,
    name: "Leo",
  },
  {
    id: 2,
    name: "Anthony",
  },
  {
    id: 3,
    name: "Cortez",
  },
];
