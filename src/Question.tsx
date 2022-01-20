import React from "react";
import { Box, Icon, VStack, Flex, Button, Text } from "@chakra-ui/react";

import OptionIcon from "./OptionIcon";
const getSize = (n: number, x: number = 1) => `${(100 / n - 4) * x}vw`;

import { QuestionType, AnswerType, OptionType } from "./types";

type NextQuestionFunction = (
  question: QuestionType,
  answer: string,
  navigate: boolean
) => void;

export default function Question({
  question,
  answer,
  nextQuestion,
  view = undefined,
}: {
  question: QuestionType;
  answer: AnswerType;
  nextQuestion: NextQuestionFunction;
  view?: string;
}) {
  const isSummary = view === "summary";
  const handleClick = (answer) => {
    nextQuestion(question, answer, !isSummary);
  };

  return (
    <>
      <Box p={2}>
        <Text textAlign="center" width="100%" fontSize="md">
          {question.title}
        </Text>
      </Box>
      <Box position="relative">
        {isSummary && (
          <Box
            zIndex={5}
            position="absolute"
            right="0px"
            top="0px"
            height="200px"
            background="linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)"
            pointerEvents="none"
            width="25vw"
          />
        )}
        <Box width="100%" overflow={isSummary ? "auto" : "visible"}>
          <Flex flexWrap={isSummary ? "nowrap" : "wrap"}>
            {Object.entries(question.options).map(
              ([key, val]: [string, OptionType]) => (
                <Button
                  onClick={() => handleClick(key)}
                  m="2vw"
                  colorScheme={answer?.answer === key ? "blue" : "gray"}
                  height={
                    isSummary
                      ? "200px"
                      : [
                          getSize(1, isSummary ? 0.5 : 1),
                          getSize(1, isSummary ? 0.5 : 1),
                          getSize(4),
                        ]
                  }
                  minWidth={
                    isSummary ? "200px" : [getSize(1), getSize(1), getSize(4)]
                  }
                  width={
                    isSummary ? "200px" : [getSize(1), getSize(1), getSize(4)]
                  }
                  variant="outline"
                >
                  <VStack width="40vw">
                    <Box
                      p={isSummary ? 3 : 5}
                      transform={isSummary ? undefined : "scale(4, 4)"}
                    >
                      <Icon
                        as={() => (
                          <OptionIcon
                            questionSlug={question.slug}
                            optionSlug={key}
                          />
                        )}
                      />
                    </Box>
                    <Text
                      fontSize={isSummary ? "14px" : "xs"}
                      style={{
                        wordWrap: "break-word",
                        whiteSpace: "break-spaces",
                      }}
                    >
                      {val.title}
                    </Text>
                    <Text
                      fontSize={isSummary ? "14px" : "xs"}
                      color="gray.600"
                      fontWeight={500}
                      style={{
                        wordWrap: "break-word",
                        whiteSpace: "break-spaces",
                      }}
                    >
                      {val.summaryDescription}
                    </Text>
                  </VStack>
                </Button>
              )
            )}
            <Box flexShrink={0} width="25vw" />
          </Flex>
        </Box>
      </Box>
    </>
  );
}
