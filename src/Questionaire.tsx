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
import { questions, dimensions } from "./lib/questions";
import Question from "./Question";

import { Selections, AnswerType } from "./types";

type CharacterStats = Record<string, number>;

const getDefaultDimensions = (dimensions) =>
  Object.keys(dimensions).reduce(
    (acc: CharacterStats, dim: string): CharacterStats => ({ ...acc, dim: 0 }),
    {}
  ) as CharacterStats;

const calculate = (dimensions, selections: Selections): CharacterStats => {
  const defaultDimensions = getDefaultDimensions(dimensions);
  return Object.entries(selections).reduce(
    (acc: CharacterStats, [_question, selection]: [string, AnswerType]) => {
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
    defaultDimensions
  );
};

export default function Questionaire({ questions, dimensions }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const isComplete = questions[questionNumber] === undefined;

  const [character] = Object.entries(calculate(dimensions, selections)).reduce(
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
    <>
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
          answer={selections[questions[questionNumber].slug]}
          nextQuestion={nextQuestion}
          question={questions[questionNumber]}
        />
      )}
      {isComplete && (
        <Box>
          <Heading>You got "{dimensions[character].title}"!</Heading>
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
    </>
  );
}
