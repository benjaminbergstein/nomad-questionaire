import React from "react";
import { Flex, Divider, Text, Box } from "@chakra-ui/react";

export default function QuizDivider() {
  return (
    <Flex alignItems="center" my={4} maxWidth="700px" mx="auto">
      <Box flex={1} px={3}>
        <Divider borderColor="gray.400" />
      </Box>
      <Box>
        <Text
          color="gray.400"
          fontSize="xs"
          fontWeight={700}
          style={{ textTransform: "uppercase", letterSpacing: "1px" }}
        >
          Quiz
        </Text>
      </Box>
      <Box px={3} flex={1}>
        <Divider borderColor="gray.400" />
      </Box>
    </Flex>
  );
}
