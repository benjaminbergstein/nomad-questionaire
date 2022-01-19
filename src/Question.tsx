import React from "react";
import { Box, Icon, VStack, Flex, Button, Text } from "@chakra-ui/react";

import OptionIcon from "./OptionIcon";
const getSize = (n: number) => `${100 / n - 2}vw`;

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
    <Flex justifyContent="space-between" flexWrap="wrap">
      {Object.entries(question.options).map(
        ([key, val]: [string, OptionType]) => (
          <Button
            onClick={() => handleClick(key)}
            mb="4vw"
            colorScheme={answer?.answer === key ? "blue" : "gray"}
            height={[getSize(2), getSize(2), getSize(4)]}
            width={[getSize(2), getSize(2), getSize(4)]}
            variant="outline"
          >
            <VStack>
              <Box p={5} transform="scale(4, 4)">
                <Icon
                  as={() => (
                    <OptionIcon questionSlug={question.slug} optionSlug={key} />
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
  );
}
