import { SurveyResponse } from '../entities/survey-response.entity';

export interface ResponseRepository {
  save(response: SurveyResponse): Promise<SurveyResponse>;
}
