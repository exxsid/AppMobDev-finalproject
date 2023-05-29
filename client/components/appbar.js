import React from "react-native";
import { StatusBar, HStack, Box, IconButton, Icon, Heading } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import color from "../constants/color";

export const AppBar = ({
  title,
  leadingButton = { isLeading: false, leadingCBF: () => {} },
}) => {
  return (
    <>
      <StatusBar bg={color.primary} barStyle="light-content" />
      <Box safeAreaTop bg={color.primary} />
      <HStack
        bg={"gray.50"}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          {leadingButton.isLeading && (
            <IconButton
              icon={
                <Icon
                  as={Ionicons}
                  name="ios-arrow-back"
                  color={color.textdark}
                />
              }
              onPress={leadingButton.leadingCBF}
            />
          )}
          <Heading color={color.primary} fontSize="2xl" px="3">
            {title}
          </Heading>
        </HStack>
      </HStack>
    </>
  );
};
