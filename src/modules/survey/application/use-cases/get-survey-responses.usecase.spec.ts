import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetSurveyResponsesUseCase } from './get-survey-responses.usecase';
import { SurveyRepository } from '../../domain/repositories/survey.repository';
import { Survey } from '../../domain/entities/survey.entity';
import { SurveyResponse } from '../../domain/entities/survey-response.entity';

describe('GetSurveyResponsesUseCase', () => {
  let useCase: GetSurveyResponsesUseCase;
  let surveyRepository: SurveyRepository; // El Mock

  // 1. Configuración del Módulo de Test
  beforeEach(async () => {
    // Creamos un objeto "falso" que simula ser el repositorio
    const mockSurveyRepository = {
      findById: jest.fn(),
      findResponses: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSurveyResponsesUseCase,
        {
          // Usamos el mismo Token que usaste en el @Inject('SurveyRepository')
          provide: 'SurveyRepository',
          useValue: mockSurveyRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetSurveyResponsesUseCase>(GetSurveyResponsesUseCase);
    surveyRepository = module.get<SurveyRepository>('SurveyRepository');
  });

  // Limpiamos los mocks después de cada test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  // ESCENARIO 1: ÉXITO
  it('debe retornar respuestas si la encuesta existe', async () => {
    // A. Preparar datos (Arrange)
    const surveyId = 1;
    const mockSurvey = { id: surveyId, title: 'Test Survey' } as Survey;
    const mockResponses = [new SurveyResponse(surveyId, [], 10, new Date())];

    // B. Simular comportamiento del repositorio (Mocking)
    (surveyRepository.findById as jest.Mock).mockResolvedValue(mockSurvey); // Encuentra la encuesta
    (surveyRepository.findResponses as jest.Mock).mockResolvedValue(
      mockResponses,
    ); // Encuentra respuestas

    // C. Ejecutar (Act)
    const result = await useCase.execute(surveyId);

    // D. Verificar (Assert)
    expect(surveyRepository.findById).toHaveBeenCalledWith(surveyId); // Se llamó a validar existencia?
    expect(surveyRepository.findResponses).toHaveBeenCalledWith(surveyId); // Se buscaron respuestas?
    expect(result).toEqual(mockResponses); // El resultado es el esperado?
  });

  // ESCENARIO 2: FALLO (404)
  it('debe lanzar NotFoundException si la encuesta NO existe', async () => {
    // A. Preparar (Arrange)
    const surveyId = 999;

    // B. Simular que findById devuelve null (no existe)
    (surveyRepository.findById as jest.Mock).mockResolvedValue(null);

    // C. & D. Ejecutar y Verificar error (Act & Assert)
    await expect(useCase.execute(surveyId)).rejects.toThrow(NotFoundException);

    // Verificamos que NUNCA se intentó buscar respuestas porque falló antes
    expect(surveyRepository.findResponses).not.toHaveBeenCalled();
  });
});
