import React, { useState } from "react";
import { Input, Icon, Center, Text, FlatList, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { AppBar } from "../components/appbar";
import color from "../constants/color";
import { ProductCard } from "../components/productcard";

export const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);

  const changeSearchText = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    const url = `http://192.168.100.162:3000/searchByName/${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((prod) => {
        setSearchList(prod[0]);
      })
      .catch((err) => console.log(err));
  };

  const navigateToProductDetails = (item) => {
    navigation.push("Product Details", {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      stock: item.stock_quantity,
      category: item.category_id,
      image: item.image,
      previousScreen: "Home",
    });
  };

  return (
    <>
      <AppBar title="Search" />
      <Input
        placeholder="Enter the name of the product"
        size="lg"
        variant={"rounded"}
        InputLeftElement={
          <Icon as={<Ionicons name="ios-search-outline" />} size={5} ml="2" />
        }
        onChangeText={changeSearchText}
        onBlur={handleSearch}
      />
      <Box bg={color.background} flex={1} alignItems={"center"}>
        {searchList.length == 0 ? (
          <Center flex={1}>
            <Center>
              <Text>No Results</Text>
            </Center>
          </Center>
        ) : (
          <FlatList
            flex={1}
            data={searchList}
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
          />
        )}
      </Box>
    </>
  );
};
