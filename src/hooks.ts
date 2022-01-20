import React from "react";

import { Selections } from "./types";
import { useLocalStorageItem } from "./storage";

export const useQuestionaire = (questionaire) => {
  const [_, setQuestionaire] = useLocalStorageItem("questionaire", "who");
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
    setSelections({});
    setQuestionNumber(0);
  };

  return {
    questionNumber,
    setQuestionNumber,
    selections,
    setSelections,
    reset,
  };
};

export const useReset = () => {
  const { reset: resetWho } = useQuestionaire("who");
  const { reset: resetWhere } = useQuestionaire("where");
  return () => {
    resetWho();
    resetWhere();
  };
};

export const useCurrentQuestionaire = () => {
  const [currentQuestionaire, setQuestionaire] = useLocalStorageItem(
    "questionaire",
    "who"
  );
  return { currentQuestionaire, setQuestionaire };
};
