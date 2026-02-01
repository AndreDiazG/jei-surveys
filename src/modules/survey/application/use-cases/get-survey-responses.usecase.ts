import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { SurveyRepository } from '../../domain/repositories/survey.repository';
import { SurveyResponse } from '../../domain/entities/survey-response.entity';

@Injectable()
export class GetSurveyResponsesUseCase {
  constructor(
    @Inject('SurveyRepository')
    private readonly surveyRepository: SurveyRepository,
  ) {}

  async execute(surveyId: number): Promise<SurveyResponse[]> {
    const survey = await this.surveyRepository.findById(surveyId);

    if (!survey) {
      throw new NotFoundException(`La encuesta con ID ${surveyId} no existe`);
    }

    return this.surveyRepository.findResponses(surveyId);
  }
}
