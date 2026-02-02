import { Test, TestingModule } from '@nestjs/testing';
import { SurveyController } from './survey.controller';

// 1. Imports de Casos de Uso
import { CreateSurveyUseCase } from '../../application/use-cases/create-survey.usecase';
import { GetSurveyUseCase } from '../../application/use-cases/get-survey.usecase';
import { GetUserSurveysUseCase } from '../../application/use-cases/get-user-surveys.usecase';
import { GetSurveyResponsesUseCase } from '../../application/use-cases/get-survey-responses.usecase';
import { DeleteSurveyUseCase } from '../../application/use-cases/delete-survey.usecase';
import { UpdateSurveyUseCase } from '../../application/use-cases/update-survey.usecase';

// 2. Imports de DTOs, Entidades e Interfaces
import { CreateSurveyDto } from '../../application/dtos/create-survey.dto';
import { UpdateSurveyDto } from '../../application/dtos/update-survey.dto';
import { Survey } from '../../domain/entities/survey.entity';
import { SurveyResponse } from '../../domain/entities/survey-response.entity';
import type { UserContext } from '../../../../modules/auth/application/interfaces/auth.interfaces';

describe('SurveyController', () => {
  let controller: SurveyController;

  // Referencias a los mocks de los casos de uso
  let createUseCase: CreateSurveyUseCase;
  let getUseCase: GetSurveyUseCase;
  let getUserSurveysUseCase: GetUserSurveysUseCase;
  let getResponsesUseCase: GetSurveyResponsesUseCase;
  let deleteUseCase: DeleteSurveyUseCase;
  let updateUseCase: UpdateSurveyUseCase;

  beforeEach(async () => {
    // Definimos el módulo de prueba
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [
        // Proveemos un Mock para cada caso de uso con la función 'execute'
        { provide: CreateSurveyUseCase, useValue: { execute: jest.fn() } },
        { provide: GetSurveyUseCase, useValue: { execute: jest.fn() } },
        { provide: GetUserSurveysUseCase, useValue: { execute: jest.fn() } },
        {
          provide: GetSurveyResponsesUseCase,
          useValue: { execute: jest.fn() },
        },
        { provide: DeleteSurveyUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdateSurveyUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    // Obtenemos las instancias
    controller = module.get<SurveyController>(SurveyController);
    createUseCase = module.get<CreateSurveyUseCase>(CreateSurveyUseCase);
    getUseCase = module.get<GetSurveyUseCase>(GetSurveyUseCase);
    getUserSurveysUseCase = module.get<GetUserSurveysUseCase>(
      GetUserSurveysUseCase,
    );
    getResponsesUseCase = module.get<GetSurveyResponsesUseCase>(
      GetSurveyResponsesUseCase,
    );
    deleteUseCase = module.get<DeleteSurveyUseCase>(DeleteSurveyUseCase);
    updateUseCase = module.get<UpdateSurveyUseCase>(UpdateSurveyUseCase);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  // --- 1. TEST CREATE (POST /surveys) ---
  describe('create', () => {
    it('debe llamar a CreateSurveyUseCase con el DTO y el ID del usuario', async () => {
      // Arrange
      const dto: CreateSurveyDto = {
        title: 'Nueva Encuesta',
        description: 'Test',
        isActive: true,
        // questions: [] (Opcional según tu DTO)
      };

      // Simulamos el usuario que viene del decorador @CurrentUser
      const mockUser: UserContext = {
        id: 10,
        email: 'test@mail.com',
        role: 'user',
      };

      const expectedResult = {
        id: 1,
        ...dto,
        ownerId: mockUser.id,
      } as unknown as Survey;

      // Mockeamos la respuesta del caso de uso
      (createUseCase.execute as jest.Mock).mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(dto, mockUser);

      // Assert
      expect(createUseCase.execute).toHaveBeenCalledWith(dto, mockUser.id);
      expect(result).toBe(expectedResult);
    });
  });

  // --- 2. TEST FIND ALL MY SURVEYS (GET /surveys) ---
  describe('findAllMySurveys', () => {
    it('debe llamar a GetUserSurveysUseCase con el ID del usuario', async () => {
      // Arrange
      const mockUser: UserContext = {
        id: 5,
        email: 'user@mail.com',
        role: 'user',
      };
      const expectedList = [
        { id: 1, title: 'S1' },
        { id: 2, title: 'S2' },
      ];

      (getUserSurveysUseCase.execute as jest.Mock).mockResolvedValue(
        expectedList,
      );

      // Act
      const result = await controller.findAllMySurveys(mockUser);

      // Assert
      expect(getUserSurveysUseCase.execute).toHaveBeenCalledWith(mockUser.id);
      expect(result).toBe(expectedList);
    });
  });

  // --- 3. TEST FIND ONE (GET /surveys/:id) ---
  describe('findOne', () => {
    it('debe llamar a GetSurveyUseCase con el ID de la encuesta', async () => {
      // Arrange
      const surveyId = 1;
      const expectedSurvey = { id: surveyId, title: 'Encuesta Pública' };

      (getUseCase.execute as jest.Mock).mockResolvedValue(expectedSurvey);

      // Act
      const result = await controller.findOne(surveyId);

      // Assert
      expect(getUseCase.execute).toHaveBeenCalledWith(surveyId);
      expect(result).toBe(expectedSurvey);
    });
  });

  // --- 4. TEST GET RESPONSES (GET /surveys/:id/responses) ---
  describe('getResponses', () => {
    it('debe llamar a GetSurveyResponsesUseCase con el ID de la encuesta', async () => {
      // Arrange
      const surveyId = 100;
      const expectedResponses = [
        new SurveyResponse(surveyId, [], 1, new Date()),
      ];

      (getResponsesUseCase.execute as jest.Mock).mockResolvedValue(
        expectedResponses,
      );

      // Act
      const result = await controller.getResponses(surveyId);

      // Assert
      expect(getResponsesUseCase.execute).toHaveBeenCalledWith(surveyId);
      expect(result).toBe(expectedResponses);
    });
  });

  // --- 5. TEST DELETE (DELETE /surveys/:id) ---
  describe('delete', () => {
    it('debe llamar a DeleteSurveyUseCase con el ID correcto', async () => {
      // Arrange
      const surveyId = 5;
      (deleteUseCase.execute as jest.Mock).mockResolvedValue(undefined);

      // Act
      await controller.delete(surveyId);

      // Assert
      expect(deleteUseCase.execute).toHaveBeenCalledWith(surveyId);
    });
  });

  // --- 6. TEST UPDATE (PATCH /surveys/:id) ---
  describe('update', () => {
    it('debe llamar a UpdateSurveyUseCase con el ID y el DTO', async () => {
      // Arrange
      const surveyId = 5;
      const dto: UpdateSurveyDto = { isActive: false };
      const expectedResult = { id: surveyId, isActive: false };

      (updateUseCase.execute as jest.Mock).mockResolvedValue(expectedResult);

      // Act
      const result = await controller.update(surveyId, dto);

      // Assert
      expect(updateUseCase.execute).toHaveBeenCalledWith(surveyId, dto);
      expect(result).toBe(expectedResult);
    });
  });
});
