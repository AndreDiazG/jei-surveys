import { QuestionOptions } from '../types/question-options.types';

export class Question {
  id?: number;
  text: string;
  type: string;
  options: QuestionOptions;
  required: boolean;
  position: number;
  surveyId: number;

  constructor(
    text: string,
    type: string,
    surveyId: number,
    options: QuestionOptions,
    required: boolean = false,
    position: number = 0,
    id?: number,
  ) {
    this.text = text;
    this.type = type;
    this.surveyId = surveyId;
    this.options = options;
    this.required = required;
    this.position = position;
    this.id = id;
  }
}
