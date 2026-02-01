import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { SurveyRepository } from '../../domain/repositories/survey.repository';
import { Survey } from '../../domain/entities/survey.entity';

@Injectable()
export class GetSurveyUseCase {
  constructor(
    @Inject('SurveyRepository')
    private readonly surveyRepository: SurveyRepository,
  ) {}

  async execute(id: number): Promise<Survey> {
    const survey = await this.surveyRepository.findById(id);

    if (!survey) {
      throw new NotFoundException(`La encuesta con ID ${id} no existe`);
    }

    return survey;
  }
}
