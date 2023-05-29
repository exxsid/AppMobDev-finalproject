import React from "react";
import {
  Box,
  Center,
  AspectRatio,
  Image,
  Stack,
  Heading,
  Text,
  HStack,
  Divider,
} from "native-base";

import color from "../constants/color";

export const ProductCard = ({
  name,
  price,
  quantity,
  unit,
  stock,
  category,
  imageLink,
}) => {
  return (
    <>
      <Box alignItems="center" mb={3} mx={1}>
        <Box
          maxW="48"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          bg={color.card}
          shadow={5}
          maxH={"96"}
        >
          <Center>
            <AspectRatio w="100%" ratio={1}>
              <Image
                source={{
                  uri: imageLink,
                }}
                alt="image"
                fallbackSource={{
                  uri: "https://i.pinimg.com/736x/4f/db/53/4fdb536da5448f61bab84eb96d339c6f.jpg",
                }}
              />
            </AspectRatio>
          </Center>
          <Stack p="4" space={3}>
            <Stack>
              <Heading
                size="md"
                ml="-1"
                color={color.textdark}
                numberOfLines={3}
              >
                {name}
              </Heading>
              {/* price quantity per unit */}
              <Text italic bold fontSize={"sm"} color={color.textlight}>
                P {price} /{unit}
              </Text>
              <Text color={color.textlight} fontSize={"xs"}>
                {stock} {unit}
              </Text>
              <Text color={color.textlight} fontSize={"xs"}>
                {category}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
