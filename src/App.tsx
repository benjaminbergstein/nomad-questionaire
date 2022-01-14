import React, { useState } from "react";
import {
  ChakraProvider,
  Heading,
  Divider,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Questions from "./questions.json";
import Question from "./Question";

import { Selections, AnswerType } from "./types";

type CharacterStats = {
  dirtbag: 0;
  minimalist: 0;
  baller: 0;
  chiller: 0;
};

const calculate = (selections: Selections): CharacterStats => {
  return Object.entries(selections).reduce(
    (acc: CharacterStats, [question, selection]: [string, AnswerType]) => {
      const answer = selection.answer;
      const stats = selection.options[answer].dimensions;
      return Object.entries(stats).reduce(
        (acc2: CharacterStats, [k, v]: [string, number]): CharacterStats => {
          return {
            ...acc2,
            [k]: acc2[k] + v,
          };
        },
        acc
      );
    },
    {
      dirtbag: 0,
      minimalist: 0,
      baller: 0,
      chiller: 0,
    }
  );
};

export default function App() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const isComplete = Questions[questionNumber] === undefined;

  const [character] = Object.entries(calculate(selections)).reduce(
    (acc: [string, number] | undefined, [key, stat]: [string, number]) => {
      if (!acc) return [key, stat];
      if (acc[1] > stat) return acc;
      return [key, stat];
    },
    undefined
  );

  const nextQuestion = (question, answer) => {
    setSelections((selections) => ({
      ...selections,
      [question.slug]: { ...question, answer },
    }));
    setQuestionNumber((n) => n + 1);
  };

  return (
    <ChakraProvider>
      {questionNumber > 0 && (
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={() => setQuestionNumber((n) => n - 1)}
        >
          Previous
        </Button>
      )}
      {!isComplete && (
        <Question
          answer={selections[Questions[questionNumber].slug]}
          nextQuestion={nextQuestion}
          question={Questions[questionNumber]}
        />
      )}
      {isComplete && (
        <Box>
          <Heading>You got "{character}"!</Heading>
          {Object.values(selections).map(
            ({ summaryTitle, answer, options }) => (
              <Box mb={2}>
                <Box>
                  <Text fontWeight={700}>{summaryTitle}</Text>
                </Box>
                <Box>
                  <Text>{options[answer].title}</Text>
                </Box>
                <Box>
                  <Text>{options[answer].summaryDescription}</Text>
                </Box>
                <Divider mt={2} mb={4} />
              </Box>
            )
          )}
        </Box>
      )}
    </ChakraProvider>
  );
}
