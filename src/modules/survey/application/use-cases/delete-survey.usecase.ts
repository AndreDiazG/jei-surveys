import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { SurveyRepository } from '../../domain/repositories/survey.repository';

@Injectable()
export class DeleteSurveyUseCase {
  constructor(
    @Inject('SurveyRepository')
    private readonly surveyRepository: SurveyRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const survey = await this.surveyRepository.findById(id);

    if (!survey) {
      throw new NotFoundException(`La encuesta con ID ${id} no existe`);
    }

    return this.surveyRepository.delete(id);
  }
}
