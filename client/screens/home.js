import React, { useEffect, useState } from "react";
import { Box, HStack, Heading, FlatList, Spinner, Center } from "native-base";
import { StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";

import { AppBar } from "../components/appbar";
import color from "../constants/color";
import { ProductCard } from "../components/productcard";

const screen = Dimensions.get("screen");

export const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://192.168.100.162:3000/products")
      .then((response) => response.json())
      .then((prods) => {
          prods.forEach(prod => {
            const image = prod.iamge;

            // covert the blob to base64-encoded string
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
              const base64 = reader.result;
            }
          });
        })
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(true));
  });

  const navigateToProductDetails = (item) => {
    navigation.push("Product Details", {
      id: item.prodid,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      stock: item.stock_quantity,
      category: item.category,
      image: item.image,
      previousScreen: "Home",
    });
  };

  const renderLoadingSpinner = () => {
    return (
      <Center flex={1}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" color={color.primary} />
          <Heading color={color.primary} fontSize="lg">
            Loading
          </Heading>
        </HStack>
      </Center>
    );
  };

  const refreshProductList = () => {
    setLoading(false);
    fetch("http://192.168.100.162:3000/products")
      .then((response) => response.json())
      .then((prods) => {
        setProducts(prods[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(true));
  };

  return (
    <>
      <AppBar title="Home" />
      <Box
        bg={color.background}
        flex={1}
        alignItems={"center"}
        width={screen.width}
      >
        <HStack
          py={4}
          px={5}
          width={"full"}
          bg={color.background}
          justifyContent={"space-between"}
        >
          <Heading fontSize={"md"} color={color.textdark}>
            All Products
          </Heading>
          <TouchableOpacity
            onPress={refreshProductList}
            style={styles.refreshButton}
          >
            <Text style={{ color: color.textlight }}>Refresh</Text>
          </TouchableOpacity>
        </HStack>

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
                  category={item.category}
                  imageLink={item.image}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.prodid}
            onEndReachedThreshold={0.5}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
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
  refreshButton: {
    padding: 5,
    backgroundColor: "#00755e",
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
