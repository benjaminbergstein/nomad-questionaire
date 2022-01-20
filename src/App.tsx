import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Questionaires from "./lib/questions";

import Questionaire from "./Questionaire";
import { useLocalStorageItem } from "./storage";
export default function App() {
  const [questionaire] = useLocalStorageItem("questionaire", "who");
  return (
    <ChakraProvider>
      <Questionaire {...{ questionaire }} />
    </ChakraProvider>
  );
}
