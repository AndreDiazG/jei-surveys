import { AnswerValue } from '../types/answer.types';

export class SurveyAnswer {
  questionId: number;
  value: AnswerValue;

  constructor(questionId: number, value: AnswerValue) {
    this.questionId = questionId;
    this.value = value;
  }
}

export class SurveyResponse {
  id?: number;
  surveyId: number;
  answers: SurveyAnswer[];
  submittedAt?: Date;

  constructor(
    surveyId: number,
    answers: SurveyAnswer[],
    id?: number,
    submittedAt?: Date,
  ) {
    this.surveyId = surveyId;
    this.answers = answers;
    this.id = id;
    this.submittedAt = submittedAt;
  }
}
