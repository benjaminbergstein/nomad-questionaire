import Questions from "../questions.json";
import WhereQuestions from "../where-questions.json";
import { QuestionaireType } from "../types";
import Question from "../Question";

export default {
  who: Questions as QuestionaireType,
  where: WhereQuestions as QuestionaireType,
};
