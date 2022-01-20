import React, { useEffect, useRef } from "react";
import { Heading, Box } from "@chakra-ui/react";
import Question from "./Question";
import Questionaires from "./lib/questions";
import { Selections, AnswerType } from "./types";
import { useLocalStorageItem } from "./storage";
import QuizDivider from "./QuizDivider";

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
  const headingRef = useRef<HTMLDivElement>(null);
  const [currentQuestionaire] = useLocalStorageItem("questionaire", "who");
  const isCurrentQuestionaire = currentQuestionaire === questionaire;
  const [selections] = useLocalStorageItem(
    `${questionaire}:selections`,
    {}
  ) as [Selections, React.Dispatch<React.SetStateAction<Selections>>, any];

  const [character] = Object.entries(calculate(dimensions, selections)).reduce(
    (acc: [string, number] | undefined, [key, stat]: [string, number]) => {
      if (!acc) return [key, stat];
      if (acc[1] > stat) return acc;
      return [key, stat];
    },
    undefined
  );

  useEffect(() => {
    if (!isCurrentQuestionaire) return;
    window.history.pushState({}, "yes", `/${questionaire}/${character}`);
  }, [isCurrentQuestionaire]);

  useEffect(() => {
    const listener = () => {
      if (!headingRef.current) return;
      console.log(headingRef.current);
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return (
    <Box>
      <QuizDivider />
      <Box
        zIndex={1}
        position="sticky"
        top="0px"
        bg="white"
        pt={3}
        pb={3}
        boxShadow="lg"
        mb={3}
      >
        <Heading size="xs" textAlign="center">
          {Questionaires[questionaire].title}
        </Heading>

        <Heading pt={3} textAlign="center" size="sm">
          You got "{dimensions[character].title}"!
        </Heading>
      </Box>

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
