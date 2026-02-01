import { QuestionType, QuestionOptions } from '../types/question-options.types';

export class Question {
  id?: number;
  surveyId: number;
  text: string;
  type: QuestionType;
  options: QuestionOptions;
  required: boolean;
  position: number;

  constructor(
    surveyId: number,
    text: string,
    type: QuestionType,
    options: QuestionOptions,
    required: boolean = false,
    position: number = 0,
    id?: number,
  ) {
    this.surveyId = surveyId;
    this.text = text;
    this.type = type;
    this.options = options;
    this.required = required;
    this.position = position;
    this.id = id;
  }
}
