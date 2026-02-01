import { Question } from '../../domain/entities/question.entity';
import { QuestionOrmEntity } from '../persistence/entities/question.orm-entity';
import { SurveyOrmEntity } from '../persistence/entities/survey.orm-entity';

export class QuestionMapper {
  static toDomain(entity: QuestionOrmEntity): Question {
    return new Question(
      entity.survey.id,
      entity.text,
      entity.type,
      entity.options,
      entity.required,
      entity.position,
      entity.id,
    );
  }

  static toPersistence(domain: Question): QuestionOrmEntity {
    const entity = new QuestionOrmEntity();
    if (domain.id) entity.id = domain.id;

    entity.text = domain.text;
    entity.type = domain.type;
    entity.options = domain.options;
    entity.required = domain.required;
    entity.position = domain.position;
    const survey = new SurveyOrmEntity();
    survey.id = domain.surveyId;
    entity.survey = survey;

    return entity;
  }
}
