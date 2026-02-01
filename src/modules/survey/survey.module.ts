import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerOrmEntity } from './infraestructure/persistence/entities/answer.orm-entity';
import { QuestionOrmEntity } from './infraestructure/persistence/entities/question.orm-entity';
import { ResponseOrmEntity } from './infraestructure/persistence/entities/response.orm-entity';
import { SurveyOrmEntity } from './infraestructure/persistence/entities/survey.orm-entity';
import { SurveyController } from './infraestructure/controllers/survey.controller';
import { CreateSurveyUseCase } from './application/use-cases/create-survey.usecase';
import { SurveyTypeOrmRepository } from './infraestructure/persistence/repositories/survey.typeorm.repository';
import { AuthModule } from '../auth/auth.module';
import { QuestionController } from './infraestructure/controllers/question.controller';
import { CreateQuestionUseCase } from './application/use-cases/create-question.usecase';
import { QuestionTypeOrmRepository } from './infraestructure/persistence/repositories/question.typeorm.repository';
import { GetSurveyUseCase } from './application/use-cases/get-survey.usecase';
import { ResponseController } from './infraestructure/controllers/response.controller';
import { SubmitResponseUseCase } from './application/use-cases/submit-response.usecase';
import { ResponseTypeOrmRepository } from './infraestructure/persistence/repositories/response.typeorm.repository';
import { GetUserSurveysUseCase } from './application/use-cases/get-user-surveys.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SurveyOrmEntity,
      AnswerOrmEntity,
      QuestionOrmEntity,
      ResponseOrmEntity,
    ]),
    AuthModule,
  ],
  controllers: [SurveyController, QuestionController, ResponseController],
  providers: [
    CreateSurveyUseCase,
    GetSurveyUseCase,
    GetUserSurveysUseCase,
    CreateQuestionUseCase,
    SubmitResponseUseCase,
    {
      provide: 'SurveyRepository',
      useClass: SurveyTypeOrmRepository,
    },
    {
      provide: 'QuestionRepository',
      useClass: QuestionTypeOrmRepository,
    },
    {
      provide: 'ResponseRepository',
      useClass: ResponseTypeOrmRepository,
    },
  ],
  exports: ['SurveyRepository'],
})
export class SurveyModule {}
