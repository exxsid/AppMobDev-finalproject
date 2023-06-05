import {
  FlatList,
  Box,
  Heading,
  HStack,
  Spinner,
  Center,
  Modal,
  Button,
  ScrollView,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { Table, Rows, Row } from "react-native-table-component";
require("dotenv").config();

import { AppBar } from "../components/appbar";
import cartlist from "../constants/cartlist";
import color from "../constants/color";
import { ProductCard } from "../components/productcard";

const screen = Dimensions.get("screen");

export const Cart = ({ navigation }) => {
  const [cartList, setCartList] = useState(cartlist);
  const [isVisible, setIsVisible] = useState(false);

  const tableHeader = ["Product name", "Price", "Quantity", "Amount"];
  const [tableData, setTableData] = useState([]);

  const ttlAmount = cartList
    .reduce((total, item) => total + item.price * item.orderQtty, 0)
    .toFixed(2);

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
      orderQtty: item.orderQtty,
      previousScreen: "Cart",
    });
  };

  const refreshCartList = () => {
    const newData = [...cartlist];
    setCartList(newData);
    const newTableData = cartlist.map((item) => [
      item.name,
      item.price,
      item.orderQtty,
      item.price * item.orderQtty,
    ]);
    setTableData(newTableData);
  };

  const handleClearCartButton = () => {
    cartlist.length = 0;
    const newData = [...cartlist];
    setCartList(newData);
    setTableData([]);
  };

  const handleCheckOutButton = () => {
    fetch(
      "http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/saveTransaction",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount: ttlAmount,
          data: cartlist.map(({ id, orderQtty, price }) => ({
            id,
            quantity: orderQtty,
            amount: orderQtty * price,
          })),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 1) {
          alert("Check out success");
          cartlist.length = 0;
          const newData = [...cartlist];
          setCartList(newData);
        }
      });
  };

  const renderModal = () => {
    return <></>;
  };

  return (
    <>
      <AppBar title="Cart"></AppBar>
      <Modal
        isOpen={isVisible}
        onClose={() => setIsVisible(false)}
        size={"full"}
      >
        <Modal.Content maxHeight={"lg"}>
          <Modal.Header>Cart List</Modal.Header>
          <Modal.Body>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row data={tableHeader} style={styles.head} />
            </Table>
            <ScrollView>
              <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
                <Rows data={tableData} textStyle={styles.text} />
              </Table>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <HStack
              flex={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text>Total amount: {ttlAmount}</Text>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setIsVisible(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    handleCheckOutButton();
                    setIsVisible(false);
                  }}
                >
                  Confirm
                </Button>
              </Button.Group>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <HStack justifyContent={"flex-end"} space={5} p={4} bg={color.background}>
        <TouchableOpacity
          onPress={refreshCartList}
          style={styles.refreshButton}
        >
          <Text style={{ color: color.textlight }}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (cartlist.length == 0) {
              alert("Cart is empty");
              return;
            }
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
            );
          }}
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
        {cartList.length == 0 ? (
          <Center flext={1}>
            <Center>
              <Text fontSize="md">Cart is empty</Text>
            </Center>
          </Center>
        ) : (
          <FlatList
            flex={1}
            data={cartList}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
                <ProductCard
                  name={item.name}
                  price={item.price * item.orderQtty}
                  quantity={item.quantity}
                  unit={item.unit}
                  stock={item.orderQtty}
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
            extraData={cartList}
          />
        )}
      </Box>
      <HStack
        bg={"coolGray.50"}
        width={"full"}
        py={5}
        px={3}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text style={styles.totalAmount}>Total amount: PhP {ttlAmount}</Text>
        <TouchableOpacity
          onPress={() => {
            if (cartlist.length == 0) {
              alert("Cart is empty");
              return;
            }
            setIsVisible(true);
          }}
          style={styles.buyButton}
        >
          <Text style={{ color: color.textlight }}>Check Out</Text>
        </TouchableOpacity>
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
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
  clearCartButton: {
    padding: 5,
    backgroundColor: "#dfe0df",
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  totalAmount: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: { margin: 6 },
  head: { height: 40, backgroundColor: "#f1f8ff" },
});
