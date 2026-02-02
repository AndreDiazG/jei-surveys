import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetSurveyUseCase } from './get-survey.usecase';
import { SurveyRepository } from '../../domain/repositories/survey.repository';
import { Survey } from '../../domain/entities/survey.entity';

describe('GetSurveyUseCase', () => {
  let useCase: GetSurveyUseCase;
  let repository: SurveyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSurveyUseCase,
        {
          // Token de inyección
          provide: 'SurveyRepository',
          useValue: {
            findById: jest.fn(), // Solo necesitamos mockear findById
          },
        },
      ],
    }).compile();

    useCase = module.get<GetSurveyUseCase>(GetSurveyUseCase);
    repository = module.get<SurveyRepository>('SurveyRepository');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  // --- ESCENARIO 1: ÉXITO ---
  it('debe retornar la encuesta si existe', async () => {
    // A. ARRANGE
    const surveyId = 1;
    const mockSurvey = {
      id: surveyId,
      title: 'Encuesta Existente',
      questions: [], // A veces es bueno simular que viene con preguntas si tu repo lo carga
    } as unknown as Survey;

    // Simulamos que el repositorio la encuentra
    (repository.findById as jest.Mock).mockResolvedValue(mockSurvey);

    // B. ACT
    const result = await useCase.execute(surveyId);

    // C. ASSERT
    expect(repository.findById).toHaveBeenCalledWith(surveyId);
    expect(result).toEqual(mockSurvey);
  });

  // --- ESCENARIO 2: ERROR (404) ---
  it('debe lanzar NotFoundException si la encuesta NO existe', async () => {
    // A. ARRANGE
    const surveyId = 999;

    // Simulamos que el repositorio devuelve null
    (repository.findById as jest.Mock).mockResolvedValue(null);

    // B. & C. ACT & ASSERT
    await expect(useCase.execute(surveyId)).rejects.toThrow(NotFoundException);
  });
});
