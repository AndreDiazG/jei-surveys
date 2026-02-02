import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { SurveyRepository } from '../../domain/repositories/survey.repository';
import { UpdateSurveyDto } from '../dtos/update-survey.dto';
import { Survey } from '../../domain/entities/survey.entity';

@Injectable()
export class UpdateSurveyUseCase {
  constructor(
    @Inject('SurveyRepository')
    private readonly surveyRepository: SurveyRepository,
  ) {}

  async execute(id: number, dto: UpdateSurveyDto): Promise<Survey> {
    const survey = await this.surveyRepository.findById(id);

    if (!survey) {
      throw new NotFoundException(`La encuesta con ID ${id} no existe`);
    }

    // Convertir DTO a Partial<Survey> (simple casting o mapper si es complejo)
    return this.surveyRepository.update(id, dto as unknown as Partial<Survey>);
  }
}
