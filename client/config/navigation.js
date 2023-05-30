import React from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/home";
import { Scan } from "../screens/scan";
import { Cart } from "../screens/cart";
import { ProductDetails } from "../screens/productdetails";
import { Search } from "../screens/search";
import color from "../constants/color";

const homeName = "Home";
const scanName = "Scan";
const cartName = "Cart";
const searchName = "Search";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const SearchStack = createStackNavigator();

export const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (rn === scanName) {
              iconName = focused ? "ios-scan-sharp" : "ios-scan-outline";
            } else if (rn === cartName) {
              iconName = focused ? "ios-cart-sharp" : "ios-cart-outline";
            } else if (rn == searchName) {
              iconName = focused ? "ios-search-sharp" : "ios-search-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            position: "relative",
            height: "8%",
            backgroundColor: "white",
            justifyContent: "space-evenly",
            alignContent: "center",
          },
          headerShown: false,
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: color.textdark,
          tabBarLabelStyle: {
            position: "absolute",
            marginBottom: "3%",
          },
          tabBarIconStyle: {},
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name={homeName} component={HomeStackNavigator} />
        <Tab.Screen name={scanName} component={Scan} />
        <Tab.Screen name={searchName} component={SearchStackNavigator} />
        <Tab.Screen name={cartName} component={CartStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name={"HomeStack"} component={Home} />
      <HomeStack.Screen name={"Product Details"} component={ProductDetails} />
    </HomeStack.Navigator>
  );
};

export const CartStackNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CartStack.Screen name={"CartStack"} component={Cart} />
      <CartStack.Screen name={"Product Details"} component={ProductDetails} />
    </CartStack.Navigator>
  );
};

export const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen name={"Search Stack"} component={Search} />
      <SearchStack.Screen name={"Product Details"} component={ProductDetails} />
    </SearchStack.Navigator>
  );
};
