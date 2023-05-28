import React from "react-native";
import { StatusBar, HStack, Box, IconButton, Icon, Text } from "native-base";
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
        bg={color.primary}
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
                  color={color.textlight}
                />
              }
              onPress={leadingButton.leadingCBF}
            />
          )}
          <Text color="white" fontSize="20" fontWeight="bold" px="3">
            {title}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};
