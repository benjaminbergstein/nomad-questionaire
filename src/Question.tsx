import React from "react";
import { Box, Icon, VStack, Flex, Button, Text } from "@chakra-ui/react";

import OptionIcon from "./OptionIcon";
const getSize = (n: number, x: number = 1) => `${(100 / n - 4) * x}vw`;

import { QuestionType, AnswerType, OptionType } from "./types";

export default function Question({
  question,
  answer,
  nextQuestion,
}: {
  question: QuestionType;
  answer: AnswerType;
  nextQuestion: (question: QuestionType, answer: string) => void;
}) {
  const handleClick = (answer) => {
    nextQuestion(question, answer);
  };
  return (
    <>
      <Box p={2}>
        <Text textAlign="center" width="100%" fontSize="md">
          {question.title}
        </Text>
      </Box>
      <Flex justifyContent="space-between" flexWrap="wrap">
        {Object.entries(question.options).map(
          ([key, val]: [string, OptionType]) => (
            <Button
              onClick={() => handleClick(key)}
              m="2vw"
              colorScheme={answer?.answer === key ? "blue" : "gray"}
              height={[getSize(1, 0.5), getSize(1, 0.5), getSize(4)]}
              width={[getSize(1), getSize(1), getSize(4)]}
              variant="outline"
            >
              <VStack>
                <Box p={5} transform="scale(4, 4)">
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
                  style={{ wordWrap: "break-word", whiteSpace: "break-spaces" }}
                >
                  {val.title}
                </Text>
              </VStack>
            </Button>
          )
        )}
      </Flex>
    </>
  );
}
