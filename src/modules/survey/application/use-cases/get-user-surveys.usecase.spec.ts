import { Test, TestingModule } from '@nestjs/testing';
import { GetUserSurveysUseCase } from './get-user-surveys.usecase';
import { SurveyRepository } from '../../domain/repositories/survey.repository';
import { Survey } from '../../domain/entities/survey.entity';

describe('GetUserSurveysUseCase', () => {
  let useCase: GetUserSurveysUseCase;
  let repository: SurveyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserSurveysUseCase,
        {
          provide: 'SurveyRepository',
          useValue: {
            findByOwner: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetUserSurveysUseCase>(GetUserSurveysUseCase);
    repository = module.get<SurveyRepository>('SurveyRepository');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  it('debe retornar una lista de encuestas del usuario', async () => {
    // A. ARRANGE
    const userId = 10;
    const mockSurveys = [
      { id: 1, title: 'Encuesta 1', ownerId: userId },
      { id: 2, title: 'Encuesta 2', ownerId: userId },
    ] as unknown as Survey[];

    // Simulamos que el repositorio devuelve el array
    (repository.findByOwner as jest.Mock).mockResolvedValue(mockSurveys);

    // B. ACT
    const result = await useCase.execute(userId);

    // C. ASSERT
    // Verificamos que se llame a findByOwner
    expect(repository.findByOwner).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockSurveys);
  });

  it('debe retornar un array vacío si el usuario no tiene encuestas', async () => {
    // A. ARRANGE
    const userId = 20;

    // Simulamos array vacío
    (repository.findByOwner as jest.Mock).mockResolvedValue([]);

    // B. ACT
    const result = await useCase.execute(userId);

    // C. ASSERT
    expect(repository.findByOwner).toHaveBeenCalledWith(userId);
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});
