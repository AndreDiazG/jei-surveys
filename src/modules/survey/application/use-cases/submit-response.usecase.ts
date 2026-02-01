import { Inject, Injectable } from '@nestjs/common';
import type { ResponseRepository } from '../../domain/repositories/response.repository';
import {
  SurveyResponse,
  SurveyAnswer,
} from '../../domain/entities/survey-response.entity';
import { SubmitResponseDto } from '../dtos/submit-response.dto';

@Injectable()
export class SubmitResponseUseCase {
  constructor(
    @Inject('ResponseRepository')
    private readonly responseRepository: ResponseRepository,
  ) {}

  async execute(dto: SubmitResponseDto): Promise<SurveyResponse> {
    // Convertir DTO -> Domain
    const answers = dto.answers.map(
      (a) => new SurveyAnswer(a.questionId, a.value),
    );

    // Creación de la respuesta
    const response = new SurveyResponse(dto.surveyId, answers);

    return await this.responseRepository.save(response);
  }
}
