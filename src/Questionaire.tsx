import React, { useEffect } from "react";
import { Flex, Heading, Divider, Text, Box, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Question from "./Question";
import Questionaires from "./lib/questions";

import { Selections } from "./types";
import { useLocalStorageItem } from "./storage";
import Results from "./Results";
import { BiReset } from "react-icons/bi";
import QuizDivider from "./QuizDivider";

import { useCurrentQuestionaire, useQuestionaire, useReset } from "./hooks";

export default function Questionaire({ questionaire }) {
  const { currentQuestionaire, setQuestionaire } = useCurrentQuestionaire();
  const isCurrentQuestionaire = currentQuestionaire === questionaire;
  const { questions, dimensions } = Questionaires[questionaire];
  const reset = useReset();
  const { questionNumber, setQuestionNumber, selections, setSelections } =
    useQuestionaire(questionaire);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionNumber]);

  const isComplete = questions[questionNumber] === undefined;

  const nextQuestion = (question, answer, navigate = true) => {
    setSelections((selections) => ({
      ...selections,
      [question.slug]: { ...question, answer },
    }));
    if (navigate) {
      window.history.pushState(
        {},
        "yes",
        `/${questionaire}/${questions[questionNumber + 1]?.slug}`
      );
      setQuestionNumber((n) => n + 1);
    }
  };

  return (
    <>
      {!isComplete && (
        <>
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
          </Box>
          <Question
            answer={selections[questions[questionNumber].slug]}
            nextQuestion={nextQuestion}
            question={questions[questionNumber]}
          />
        </>
      )}
      {isComplete && (
        <>
          <Results
            nextQuestion={nextQuestion}
            questionaire={questionaire}
            dimensions={dimensions}
          />
          {questionaire === "where" && <Questionaire questionaire="who" />}
        </>
      )}
      {isCurrentQuestionaire && (
        <>
          <Box height="100px" />
          <Box
            px={5}
            display="flex"
            position="fixed"
            bottom="0px"
            height="100px"
            width="100vw"
            justifyContent="space-between"
          >
            {!isComplete && questionNumber > 0 && (
              <Button
                height="80px"
                width="80px"
                borderRadius="40px"
                onClick={() => setQuestionNumber((n) => n - 1)}
              >
                <Box transform="scale(1.75)">
                  <ChevronLeftIcon />
                </Box>
              </Button>
            )}
            {isComplete && (
              <Button height="80px" borderRadius="40px" onClick={reset}>
                <Box transform="scale(1.75)">
                  <BiReset />
                </Box>
              </Button>
            )}
            {isComplete && questionaire !== "where" && (
              <Button
                height="80px"
                borderRadius="40px"
                onClick={() => setQuestionaire("where")}
              >
                Next quiz
                <Box transform="scale(1.75)">
                  <ChevronRightIcon />
                </Box>
              </Button>
            )}
          </Box>
        </>
      )}
    </>
  );
}
