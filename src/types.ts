import Questions from "./questions.json";

export type QuestionType = typeof Questions["questions"][number];
export type OptionType = QuestionType["options"]["small-car"];
export type AnswerType = QuestionType & { answer: string };
export type Selections = Record<string, AnswerType>;

export type QuestionaireType = {
  questions: QuestionType[];
  dimensions: Record<string, object>;
};
