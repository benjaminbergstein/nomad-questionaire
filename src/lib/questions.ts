import Questions from "../questions.json";
import WhereQuestions from "../where-questions.json";
import { QuestionType } from "../types";

export const questions = Questions.questions as QuestionType[];
export const dimensions = Questions.dimensions;

export const whereQuestions = WhereQuestions.questions as QuestionType[];
export const cities = WhereQuestions.cities;
