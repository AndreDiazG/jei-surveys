import { Test, TestingModule } from '@nestjs/testing';
import { DeleteSurveyUseCase } from './delete-survey.usecase';
import { SurveyRepository } from '../../domain/repositories/survey.repository';
import { Survey } from '../../domain/entities/survey.entity';
import { NotFoundException } from '@nestjs/common';

describe('DeleteSurveyUseCase', () => {
  let useCase: DeleteSurveyUseCase;
  let repository: SurveyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteSurveyUseCase,
        {
          provide: 'SurveyRepository', // Asegúrate de que coincida con tu @Inject
          useValue: {
            findById: jest.fn(), // Mockeamos el método findById
            delete: jest.fn(), // Mockeamos el método delete
          },
        },
      ],
    }).compile();

    useCase = module.get<DeleteSurveyUseCase>(DeleteSurveyUseCase);
    repository = module.get<SurveyRepository>('SurveyRepository');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  it('debe eliminar la encuesta si existe', async () => {
    // A. ARRANGE
    const surveyId = 5;
    const mockSurvey = { id: surveyId, title: 'Survey a borrar' } as Survey;

    // 1. Simulamos que findById SÍ encuentra la encuesta (para pasar tu validación)
    (repository.findById as jest.Mock).mockResolvedValue(mockSurvey);

    // 2. Simulamos que delete funciona bien
    (repository.delete as jest.Mock).mockResolvedValue(undefined);

    // B. ACT
    await useCase.execute(surveyId);

    // C. ASSERT
    // Verificamos que primero buscó y luego borró
    expect(repository.findById).toHaveBeenCalledWith(surveyId);
    expect(repository.delete).toHaveBeenCalledWith(surveyId);
  });

  it('debe lanzar NotFoundException si la encuesta NO existe', async () => {
    // A. ARRANGE
    const surveyId = 999;

    // 1. Simulamos que findById devuelve NULL (no encontró nada)
    (repository.findById as jest.Mock).mockResolvedValue(null);

    // B. & C. ACT & ASSERT
    // Esperamos que lance el error NotFoundException
    await expect(useCase.execute(surveyId)).rejects.toThrow(NotFoundException);

    // IMPORTANTE: Verificamos que NO se haya llamado a delete
    // (Tu validación protegió la base de datos)
    expect(repository.delete).not.toHaveBeenCalled();
  });
});
