import { Test, TestingModule } from '@nestjs/testing';
import { ResponseController } from './response.controller';
import { SubmitResponseUseCase } from '../../application/use-cases/submit-response.usecase';
import { SubmitResponseBodyDto } from '../../application/dtos/submit-response.dto';
// Ajusta la ruta de importación de la entidad según tu proyecto
import { SurveyResponse } from '../../domain/entities/survey-response.entity';

describe('ResponseController', () => {
  let controller: ResponseController;
  let useCase: SubmitResponseUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponseController],
      providers: [
        {
          provide: SubmitResponseUseCase,
          useValue: {
            execute: jest.fn(), // Mockeamos el método execute
          },
        },
      ],
    }).compile();

    controller = module.get<ResponseController>(ResponseController);
    useCase = module.get<SubmitResponseUseCase>(SubmitResponseUseCase);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('submit', () => {
    it('debe combinar el surveyId y el bodyDto, y llamar al caso de uso', async () => {
      // A. ARRANGE (Preparar)
      const surveyId = 5;

      // Simulación de lo que envía el usuario en el Body (sin ID de encuesta)
      const bodyDto: SubmitResponseBodyDto = {
        answers: [
          { questionId: 1, value: 'Opción A' },
          { questionId: 2, value: 10 },
        ],
      };

      // Simulación de lo que devuelve el Caso de Uso (éxito)
      const expectedResponse = {
        id: 100,
        surveyId: surveyId,
        submittedAt: new Date(),
      } as SurveyResponse;

      (useCase.execute as jest.Mock).mockResolvedValue(expectedResponse);

      // B. ACT (Ejecutar)
      // Llamamos al método del controlador pasando los parámetros separados
      const result = await controller.submit(surveyId, bodyDto);

      // C. ASSERT (Verificar)

      // 1. Verificamos que al caso de uso le llegó el objeto MEZCLADO (surveyId + answers)
      expect(useCase.execute).toHaveBeenCalledWith({
        ...bodyDto,
        surveyId: surveyId,
      });

      // 2. Verificamos que el controlador devolvió lo que entregó el caso de uso
      expect(result).toBe(expectedResponse);
    });
  });
});
