import { Test, TestingModule } from '@nestjs/testing';
import { CreateQuestionUseCase } from './create-question.usecase';
import { QuestionRepository } from '../../domain/repositories/question.repository';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { Question } from '../../domain/entities/question.entity';
// import { QuestionType } from '../../domain/types/question-options.types';

describe('CreateQuestionUseCase', () => {
  let useCase: CreateQuestionUseCase;
  let repository: QuestionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateQuestionUseCase,
        {
          provide: 'QuestionRepository', // Token de inyección
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateQuestionUseCase>(CreateQuestionUseCase);
    repository = module.get<QuestionRepository>('QuestionRepository');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  // --- ESCENARIO 1: CON OPCIONES (Happy Path) ---
  it('debe crear una pregunta con opciones y llamar al repositorio', async () => {
    // A. ARRANGE
    const dto: CreateQuestionDto = {
      surveyId: 1,
      text: '¿Cuál es tu color favorito?',
      type: 'single-choice', // o el string 'SINGLE_CHOICE'
      required: true,
      options: {
        choices: ['Rojo', 'Azul', 'Verde'],
      },
    };

    // Simulamos el objeto guardado que retorna la DB (con ID)
    const savedQuestion = { ...dto, id: 10 } as unknown as Question;
    (repository.save as jest.Mock).mockResolvedValue(savedQuestion);

    // B. ACT
    const result = await useCase.execute(dto);

    // C. ASSERT
    // Verificamos que se llamó a save con una instancia de Question
    expect(repository.save).toHaveBeenCalledWith(expect.any(Question));

    // Verificamos que los datos dentro de esa instancia sean correctos
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        surveyId: dto.surveyId,
        text: dto.text,
        options: dto.options, // Aquí debe tener las opciones
      }),
    );

    expect(result).toEqual(savedQuestion);
  });

  // --- ESCENARIO 2: SIN OPCIONES (Edge Case) ---
  it('debe asignar un objeto vacío a options si no se envían en el DTO', async () => {
    // A. ARRANGE
    const dto: CreateQuestionDto = {
      surveyId: 1,
      text: 'Describe tu experiencia',
      type: 'text',
      required: false,
      // NO enviamos options (undefined)
    };

    (repository.save as jest.Mock).mockResolvedValue({
      ...dto,
      id: 11,
      options: {},
    });

    // B. ACT
    await useCase.execute(dto);

    // C. ASSERT
    // Verificamos la lógica: (dto.options || {})
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        text: dto.text,
        options: {}, // <--- ESTO ES LO IMPORTANTE: debe ser {} y no undefined
      }),
    );
  });
});
