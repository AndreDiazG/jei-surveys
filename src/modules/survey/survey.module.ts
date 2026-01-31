import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerOrmEntity } from './infraestructure/persistence/entities/answer.orm-entity';
import { QuestionOrmEntity } from './infraestructure/persistence/entities/question.orm-entity';
import { ResponseOrmEntity } from './infraestructure/persistence/entities/response.orm-entity';
import { SurveyOrmEntity } from './infraestructure/persistence/entities/survey.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SurveyOrmEntity,
      AnswerOrmEntity,
      QuestionOrmEntity,
      ResponseOrmEntity,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class SurveyModule {}
