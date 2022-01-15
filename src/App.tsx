import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { questions, dimensions } from "./lib/questions";

import Questionaire from "./Questionaire";
export default function App() {
  return (
    <ChakraProvider>
      <Questionaire {...{ questions, dimensions }} />
    </ChakraProvider>
  );
}
