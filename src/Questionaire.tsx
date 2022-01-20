import React from "react";
import { Flex, Heading, Divider, Text, Box, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Question from "./Question";
import Questionaires from "./lib/questions";

import { Selections } from "./types";
import { useLocalStorageItem } from "./storage";
import Results from "./Results";
import { BiReset } from "react-icons/bi";

export default function Questionaire({ questionaire }) {
  const [currentQuestionaire, setQuestionaire] = useLocalStorageItem(
    "questionaire",
    "who"
  );
  const isCurrentQuestionaire = currentQuestionaire === questionaire;
  const { title, questions, dimensions } = Questionaires[questionaire];
  const [questionNumber, setQuestionNumber] = useLocalStorageItem(
    `${questionaire}:question-number`,
    0
  );
  const [selections, setSelections] = useLocalStorageItem(
    `${questionaire}:selections`,
    {}
  ) as [
    Selections,
    React.Dispatch<React.SetStateAction<Selections>>,
    () => void
  ];
  const reset = () => {
    setQuestionaire("who");
    setQuestionNumber(0);
    setSelections({});
  };
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
      <Heading size="md" textAlign="center">
        {title}
      </Heading>
      {!isComplete && (
        <Question
          answer={selections[questions[questionNumber].slug]}
          nextQuestion={nextQuestion}
          question={questions[questionNumber]}
        />
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
