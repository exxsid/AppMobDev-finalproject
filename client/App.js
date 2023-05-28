import React from "react";
import { NativeBaseProvider, Box, Text, Center } from "native-base";
import "react-native-gesture-handler";

import { BottomNavigator } from "./config/navigation";

export default function App() {
  return (
    <NativeBaseProvider>
      <BottomNavigator></BottomNavigator>
    </NativeBaseProvider>
  );
}
