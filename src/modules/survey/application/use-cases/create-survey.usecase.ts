import { Inject, Injectable } from '@nestjs/common';
import type { SurveyRepository } from '../../domain/repositories/survey.repository';
import { Survey } from '../../domain/entities/survey.entity';
import { CreateSurveyDto } from '../dtos/create-survey.dto';

@Injectable()
export class CreateSurveyUseCase {
  constructor(
    @Inject('SurveyRepository') // Inyectamos la interfaz
    private readonly surveyRepository: SurveyRepository,
  ) {}

  async execute(dto: CreateSurveyDto, userId: number): Promise<Survey> {
    // 1. Convertimos el DTO a nuestra Entidad de Dominio
    const newSurvey = new Survey(
      dto.title,
      userId, // Pasamos el ID del usuario logueado
      dto.description,
      dto.isActive,
    );

    // 2. Guardamos en el repositorio
    return await this.surveyRepository.save(newSurvey);
  }
}
