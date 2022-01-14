import Questions from "./questions.json";

export type QuestionType = typeof Questions[number];
export type OptionType = typeof Questions[number]["options"]["small-car"];
export type AnswerType = QuestionType & { answer: string };
export type Selections = Record<string, AnswerType>;
