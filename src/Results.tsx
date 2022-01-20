import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import Question from "./Question";

import { Selections, AnswerType } from "./types";
import { useLocalStorageItem } from "./storage";

type CharacterStats = Record<string, number>;

const getDefaultDimensions = (dimensions) =>
  Object.keys(dimensions).reduce(
    (acc: CharacterStats, dim: string): CharacterStats => ({
      ...acc,
      [dim]: 0,
    }),
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

export default function Results({ nextQuestion, questionaire, dimensions }) {
  const [selections] = useLocalStorageItem(
    `${questionaire}:selections`,
    {}
  ) as [Selections, React.Dispatch<React.SetStateAction<Selections>>, any];

  console.log(calculate(dimensions, selections));
  const [character] = Object.entries(calculate(dimensions, selections)).reduce(
    (acc: [string, number] | undefined, [key, stat]: [string, number]) => {
      if (!acc) return [key, stat];
      if (acc[1] > stat) return acc;
      return [key, stat];
    },
    undefined
  );

  return (
    <Box pt={3}>
      <Heading textAlign="center" size="sm">
        You got "{dimensions[character].title}"!
      </Heading>
      {Object.values(selections).map(({ answer, ...question }, idx) => (
        <Question
          view="summary"
          answer={{ answer, ...question }}
          nextQuestion={nextQuestion}
          question={question}
        />
      ))}
    </Box>
  );
}
