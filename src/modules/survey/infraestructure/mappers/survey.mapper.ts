import { Survey } from '../../domain/entities/survey.entity';
import { SurveyOrmEntity } from '../persistence/entities/survey.orm-entity';
import { UserOrmEntity } from '../../../auth/infraestructure/persistence/entities/user.orm-entity';
import { QuestionMapper } from './question.mapper';

export class SurveyMapper {
  static toDomain(entity: SurveyOrmEntity): Survey {
    const questions = entity.questions
      ? entity.questions.map((questionEntity) => {
          // Asignación de la encuesta padre a cada pregunta para que pueda leer 'questionEntity.survey.id' sin romperse.
          questionEntity.survey = entity;
          return QuestionMapper.toDomain(questionEntity);
        })
      : [];

    return new Survey(
      entity.title,
      entity.createdBy?.id, // Extraemos el ID del objeto usuario
      entity.description || undefined,
      entity.isActive,
      entity.id,
      entity.createdAt,
      questions,
    );
  }

  static toPersistence(domain: Survey): SurveyOrmEntity {
    const entity = new SurveyOrmEntity();
    if (domain.id) {
      entity.id = domain.id;
    }
    entity.title = domain.title;
    entity.description = domain.description ?? null;
    entity.isActive = domain.isActive;
    const user = new UserOrmEntity();
    user.id = domain.ownerId;
    entity.createdBy = user;

    return entity;
  }
}
