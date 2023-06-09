import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Heading,
  FlatList,
  Spinner,
  Center,
  Button,
} from "native-base";
import { StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import { decode as atob, encode as btoa } from "base-64";
require("dotenv").config();

import { AppBar } from "../components/appbar";
import color from "../constants/color";
import { ProductCard } from "../components/productcard";

const screen = Dimensions.get("screen");

export const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(2);
  const [prevPage, setPrevPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    fetch(
      `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/products/${currPage}`
    )
      .then((response) => response.json())
      .then((prods) => {
        setPrevPage(prods.prev);
        setNextPage(prods.next);
        setCurrPage((prods.prev + prods.next) / 2);

        const arrayBufferToBase64 = (b) => {
          var binary = "";
          var bytes = new Uint8Array(b);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return btoa(binary);
        };
        const newProdData = prods.data.map((item, index) => {
          const image = item.product_image;
          return new Promise((resolve, reject) => {
            const res = arrayBufferToBase64(image.data);
            const imageURI = `data:image/jpeg;base64,${res}`;

            const newData = {
              id: item.product_id,
              name: item.product_name,
              price: item.price,
              quantity: item.quantity,
              unit: item.unit,
              stock: item.stock_quantity,
              category: item.category_name,
              image: imageURI,
            };

            resolve(newData);
          }); // end promise
        }); // end newProdData

        Promise.all(newProdData)
          .then((prodData) => {
            setProducts(prodData);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(true));
  }, []);

  const navigateToProductDetails = (item) => {
    navigation.push("Product Details", {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      stock: item.stock,
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
    fetch(
      `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/products/${currPage}`
    )
      .then((response) => response.json())
      .then((prods) => {
        setPrevPage(prods.prev);
        setNextPage(prods.next);
        setCurrPage((prods.prev + prods.next) / 2);

        const arrayBufferToBase64 = (b) => {
          var binary = "";
          var bytes = new Uint8Array(b);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return btoa(binary);
        };
        const newProdData = prods.data.map((item, index) => {
          const image = item.product_image;
          return new Promise((resolve, reject) => {
            const res = arrayBufferToBase64(image.data);
            const imageURI = `data:image/jpeg;base64,${res}`;

            const newData = {
              id: item.product_id,
              name: item.product_name,
              price: item.price,
              quantity: item.quantity,
              unit: item.unit,
              stock: item.stock_quantity,
              category: item.category_name,
              image: imageURI,
            };

            resolve(newData);
          }); // end promise
        }); // end newProdData

        Promise.all(newProdData)
          .then((prodData) => {
            setProducts(prodData);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(true));
  };

  const handleNextBtn = (page) => {
    setLoading(false);
    fetch(
      `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/products/${page}`
    )
      .then((response) => response.json())
      .then((prods) => {
        setPrevPage(prods.prev);
        setNextPage(prods.next);
        setCurrPage((prods.prev + prods.next) / 2);

        const arrayBufferToBase64 = (b) => {
          var binary = "";
          var bytes = new Uint8Array(b);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return btoa(binary);
        };
        const newProdData = prods.data.map((item, index) => {
          const image = item.product_image;
          return new Promise((resolve, reject) => {
            const res = arrayBufferToBase64(image.data);
            const imageURI = `data:image/jpeg;base64,${res}`;

            const newData = {
              id: item.product_id,
              name: item.product_name,
              price: item.price,
              quantity: item.quantity,
              unit: item.unit,
              stock: item.stock_quantity,
              category: item.category_name,
              image: imageURI,
            };

            resolve(newData);
          }); // end promise
        }); // end newProdData

        Promise.all(newProdData)
          .then((prodData) => {
            setProducts(prodData);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(true));
  };

  const handlePrevBtn = (page) => {
    setLoading(false);
    fetch(
      `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/products/${page}`
    )
      .then((response) => response.json())
      .then((prods) => {
        setPrevPage(prods.prev);
        setNextPage(prods.next);
        setCurrPage((prods.prev + prods.next) / 2);

        const arrayBufferToBase64 = (b) => {
          var binary = "";
          var bytes = new Uint8Array(b);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return btoa(binary);
        };
        const newProdData = prods.data.map((item, index) => {
          const image = item.product_image;
          return new Promise((resolve, reject) => {
            const res = arrayBufferToBase64(image.data);
            const imageURI = `data:image/jpeg;base64,${res}`;

            const newData = {
              id: item.product_id,
              name: item.product_name,
              price: item.price,
              quantity: item.quantity,
              unit: item.unit,
              stock: item.stock_quantity,
              category: item.category_name,
              image: imageURI,
            };

            resolve(newData);
          }); // end promise
        }); // end newProdData

        Promise.all(newProdData)
          .then((prodData) => {
            setProducts(prodData);
          })
          .catch((error) => {
            console.error(error);
          });
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
                  stock={item.stock}
                  category={item.category}
                  imageLink={item.image}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.5}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
          />
        ) : (
          renderLoadingSpinner()
        )}
        <HStack
          width={"full"}
          py={1}
          px={3}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {prevPage == 0 ? (
            <Button
              onPress={() => handlePrevBtn(prevPage)}
              variant={"subtle"}
              isDisabled
            >
              Previous
            </Button>
          ) : (
            <Button onPress={() => handlePrevBtn(prevPage)} variant={"subtle"}>
              Previous
            </Button>
          )}
          {nextPage == 0 ? (
            <Button
              onPress={() => handleNextBtn(nextPage)}
              variant={"subtle"}
              isDisabled
            >
              Next
            </Button>
          ) : (
            <Button onPress={() => handleNextBtn(nextPage)} variant={"subtle"}>
              Next
            </Button>
          )}
        </HStack>
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
