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
  controllers: [SurveyController],
  providers: [
    CreateSurveyUseCase,
    {
      provide: 'SurveyRepository',
      useClass: SurveyTypeOrmRepository,
    },
  ],
  exports: ['SurveyRepository'],
})
export class SurveyModule {}
