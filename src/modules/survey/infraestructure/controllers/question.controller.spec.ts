import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { CreateQuestionUseCase } from '../../application/use-cases/create-question.usecase';
import { CreateQuestionBodyDto } from '../../application/dtos/create-question.dto';

describe('QuestionController', () => {
  let controller: QuestionController;
  let useCase: CreateQuestionUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: CreateQuestionUseCase,
          useValue: {
            execute: jest.fn(), // Mock del método execute
          },
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    useCase = module.get<CreateQuestionUseCase>(CreateQuestionUseCase);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debe tomar el surveyId de la URL, combinarlo con el body y llamar al caso de uso', async () => {
      // A. ARRANGE
      const surveyId = 50;

      // Simulamos los datos que vienen en el cuerpo de la petición (sin ID de encuesta)
      const bodyDto: CreateQuestionBodyDto = {
        text: '¿Qué te pareció el servicio?',
        type: 'rating', // O 'RATING' si usas strings
        required: true,
        options: {
          max: 5,
          min: 1,
        },
      };

      // Simulamos lo que devuelve el caso de uso
      const expectedResult = {
        id: 1,
        surveyId: surveyId,
        ...bodyDto,
      };

      (useCase.execute as jest.Mock).mockResolvedValue(expectedResult);

      // B. ACT
      // Llamamos al controlador como si fueramos NestJS
      const result = await controller.create(surveyId, bodyDto);

      // C. ASSERT

      // 1. Verificación CRÍTICA: ¿Fusionó los datos correctamente?
      expect(useCase.execute).toHaveBeenCalledWith({
        ...bodyDto,
        surveyId: surveyId, // Aquí está la magia que probamos
      });

      // 2. Verificamos que devuelva la respuesta al cliente
      expect(result).toBe(expectedResult);
    });
  });
});
