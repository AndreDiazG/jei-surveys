import { Inject, Injectable } from '@nestjs/common';
import type { SurveyRepository } from '../../domain/repositories/survey.repository';
import { Survey } from '../../domain/entities/survey.entity';

@Injectable()
export class GetUserSurveysUseCase {
  constructor(
    @Inject('SurveyRepository')
    private readonly surveyRepository: SurveyRepository,
  ) {}

  async execute(userId: number): Promise<Survey[]> {
    return await this.surveyRepository.findByOwner(userId);
  }
}
