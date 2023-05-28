import React from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/home";
import { Scan } from "../screens/scan";
import { Cart } from "../screens/cart";
import { ProductDetails } from "../screens/productdetails";

const homeName = "Home";
const scanName = "Scan";
const cartName = "Cart";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

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
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            position: "relative",
            height: "8%",
            backgroundColor: "#ff2800",
            justifyContent: "space-evenly",
            alignContent: "center",
          },
          headerShown: false,
          tabBarActiveTintColor: "#f1f1f1",
          tabBarLabelStyle: {
            position: "absolute",
            marginBottom: "3%",
          },
          tabBarIconStyle: {},
        })}
      >
        <Tab.Screen name={homeName} component={HomeStackNavigator} />
        <Tab.Screen name={scanName} component={Scan} />
        <Tab.Screen name={cartName} component={Cart} />
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
      <HomeStack.Screen name={"Home"} component={Home} />
      <HomeStack.Screen name={"Product Details"} component={ProductDetails} />
    </HomeStack.Navigator>
  );
};
