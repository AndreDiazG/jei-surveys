import { Question } from '../entities/question.entity';

export interface QuestionRepository {
  save(question: Question): Promise<Question>;
  // findBySurveyId(surveyId: number): Promise<Question[]>; // Para el futuro
}
