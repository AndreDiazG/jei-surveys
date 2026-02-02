import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UpdateSurveyUseCase } from './update-survey.usecase';
import { SurveyRepository } from '../../domain/repositories/survey.repository';
import { UpdateSurveyDto } from '../dtos/update-survey.dto';
import { Survey } from '../../domain/entities/survey.entity';

describe('UpdateSurveyUseCase', () => {
  let useCase: UpdateSurveyUseCase;
  let repository: SurveyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSurveyUseCase,
        {
          provide: 'SurveyRepository',
          useValue: {
            // Mockeamos findById (para la validación) y update (para la acción)
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateSurveyUseCase>(UpdateSurveyUseCase);
    repository = module.get<SurveyRepository>('SurveyRepository');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  // --- ESCENARIO 1: ÉXITO ---
  it('debe actualizar la encuesta si existe y retornar la entidad actualizada', async () => {
    // A. ARRANGE
    const surveyId = 1;
    const dto: UpdateSurveyDto = { isActive: false, title: 'Nuevo Título' };

    // 1. Simulamos que la encuesta existe (para pasar la validación inicial)
    const existingSurvey = {
      id: surveyId,
      title: 'Viejo Título',
      isActive: true,
    } as Survey;
    (repository.findById as jest.Mock).mockResolvedValue(existingSurvey);

    // 2. Simulamos que el repositorio actualiza y devuelve la nueva versión
    const updatedSurvey = { ...existingSurvey, ...dto } as Survey;
    (repository.update as jest.Mock).mockResolvedValue(updatedSurvey);

    // B. ACT
    const result = await useCase.execute(surveyId, dto);

    // C. ASSERT
    expect(repository.findById).toHaveBeenCalledWith(surveyId); // Validó existencia?
    expect(repository.update).toHaveBeenCalledWith(surveyId, dto); // Llamó a update con los datos?
    expect(result).toEqual(updatedSurvey); // Devolvió lo correcto?
  });

  // --- ESCENARIO 2: ERROR (404) ---
  it('debe lanzar NotFoundException si la encuesta NO existe', async () => {
    // A. ARRANGE
    const surveyId = 999;
    const dto: UpdateSurveyDto = { isActive: false };

    // 1. Simulamos que NO encuentra nada (null)
    (repository.findById as jest.Mock).mockResolvedValue(null);

    // B. & C. ACT & ASSERT
    await expect(useCase.execute(surveyId, dto)).rejects.toThrow(
      NotFoundException,
    );

    // Verificamos que NUNCA intentó actualizar
    expect(repository.update).not.toHaveBeenCalled();
  });
});
