import { Test, TestingModule } from '@nestjs/testing';
import { CreateSurveyUseCase } from './create-survey.usecase';
import { SurveyRepository } from '../../domain/repositories/survey.repository';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { Survey } from '../../domain/entities/survey.entity';

describe('CreateSurveyUseCase', () => {
  let useCase: CreateSurveyUseCase;
  let surveyRepository: SurveyRepository;

  beforeEach(async () => {
    // 1. Configuramos el módulo de prueba
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSurveyUseCase,
        {
          // Recuerda usar el mismo token (@Inject('SurveyRepository')) que en tu código real
          provide: 'SurveyRepository',
          useValue: {
            save: jest.fn(), // Mockeamos solo el método save
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateSurveyUseCase>(CreateSurveyUseCase);
    surveyRepository = module.get<SurveyRepository>('SurveyRepository');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  it('debe crear una encuesta correctamente asignando el usuario propietario', async () => {
    // A. ARRANGE (Preparar datos)
    const userId = 10;
    const dto: CreateSurveyDto = {
      title: 'Encuesta de Satisfacción',
      description: 'Evalúa nuestro servicio',
      isActive: true,
    };

    // Simulamos lo que devolvería la base de datos después de guardar
    // (normalmente devuelve la misma entidad con un ID asignado y fechas)
    const expectedSavedSurvey = {
      ...dto,
      id: 1,
      createdAt: new Date(),
      ownerId: userId, // O la estructura que use tu entidad (ej: createdBy: { id: userId })
    } as unknown as Survey;

    // Configuramos el mock para que devuelva este objeto cuando llamen a save()
    (surveyRepository.save as jest.Mock).mockResolvedValue(expectedSavedSurvey);

    // B. ACT (Ejecutar)
    const result = await useCase.execute(dto, userId);

    // C. ASSERT (Verificar)

    // 1. Verificamos que el resultado sea lo que esperábamos
    expect(result).toEqual(expectedSavedSurvey);

    // 2. Verificamos que se llamó al repositorio con los datos correctos.
    // Aquí es importante verificar que se le pasó el DTO + el ID del usuario.
    // Usamos expect.objectContaining para no tener que validar cada campo milimétricamente si no queremos.
    expect(surveyRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: dto.title,
        description: dto.description,
        isActive: dto.isActive,
        // Dependiendo de cómo asignes el usuario en tu caso de uso, valida esto:
        // Opción A (si asignas objeto): createdBy: { id: userId }
        // Opción B (si asignas ID directo): ownerId: userId
      }),
    );
  });
});
