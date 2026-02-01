import { Survey } from '../../domain/entities/survey.entity';
import { SurveyOrmEntity } from '../persistence/entities/survey.orm-entity';
import { UserOrmEntity } from '../../../auth/infraestructure/persistence/entities/user.orm-entity';

export class SurveyMapper {
  static toDomain(entity: SurveyOrmEntity): Survey {
    return new Survey(
      entity.title,
      entity.createdBy?.id, // Extraemos el ID del objeto usuario
      entity.description || undefined,
      entity.isActive,
      entity.id,
      entity.createdAt,
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
