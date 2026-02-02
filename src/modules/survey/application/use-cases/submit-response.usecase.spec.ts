import { Test, TestingModule } from '@nestjs/testing';
import { SubmitResponseUseCase } from './submit-response.usecase';
// Importamos la interfaz del repositorio de respuestas (ajusta la ruta si es necesario)
import { ResponseRepository } from '../../domain/repositories/response.repository';
import { SubmitResponseDto } from '../dtos/submit-response.dto';
import { SurveyResponse } from '../../domain/entities/survey-response.entity';

describe('SubmitResponseUseCase', () => {
  let useCase: SubmitResponseUseCase;
  let responseRepository: ResponseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmitResponseUseCase,
        {
          // 1. CAMBIO IMPORTANTE: Inyectamos 'ResponseRepository'
          provide: 'ResponseRepository',
          useValue: {
            save: jest.fn(), // Mockeamos el método save
          },
        },
      ],
    }).compile();

    useCase = module.get<SubmitResponseUseCase>(SubmitResponseUseCase);
    responseRepository = module.get<ResponseRepository>('ResponseRepository');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  it('debe convertir el DTO y llamar al repositorio para guardar', async () => {
    // A. ARRANGE
    const dto: SubmitResponseDto = {
      surveyId: 1,
      answers: [{ questionId: 10, value: 'Respuesta' }],
    };

    // Simulamos la respuesta guardada que devuelve el repositorio
    const savedResponse = new SurveyResponse(dto.surveyId, [], 100, new Date());

    // Configuramos el mock
    (responseRepository.save as jest.Mock).mockResolvedValue(savedResponse);

    // B. ACT
    const result = await useCase.execute(dto);

    // C. ASSERT
    // Verificamos que llamamos a save con una instancia de SurveyResponse
    expect(responseRepository.save).toHaveBeenCalledWith(
      expect.any(SurveyResponse),
    );
    expect(result).toEqual(savedResponse);
  });
});
