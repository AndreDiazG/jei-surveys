import {
  SurveyResponse,
  SurveyAnswer,
} from '../../domain/entities/survey-response.entity';
import { ResponseOrmEntity } from '../persistence/entities/response.orm-entity';
import { AnswerOrmEntity } from '../persistence/entities/answer.orm-entity';
import { SurveyOrmEntity } from '../persistence/entities/survey.orm-entity';
import { QuestionOrmEntity } from '../persistence/entities/question.orm-entity';

export class ResponseMapper {
  static toPersistence(domain: SurveyResponse): ResponseOrmEntity {
    const responseEntity = new ResponseOrmEntity();
    if (domain.id) responseEntity.id = domain.id;

    // Relación con Survey
    const survey = new SurveyOrmEntity();
    survey.id = domain.surveyId;
    responseEntity.survey = survey;

    // Relación con Answers
    responseEntity.answers = domain.answers.map((a) => {
      const answerEntity = new AnswerOrmEntity();
      answerEntity.value = a.value;

      const question = new QuestionOrmEntity();
      question.id = a.questionId;
      answerEntity.question = question;

      return answerEntity;
    });

    return responseEntity;
  }

  static toDomain(entity: ResponseOrmEntity): SurveyResponse {
    const answers = entity.answers
      ? entity.answers.map((a) => new SurveyAnswer(a.question.id, a.value))
      : [];

    return new SurveyResponse(
      entity.survey.id,
      answers,
      entity.id,
      entity.submittedAt,
    );
  }
}
