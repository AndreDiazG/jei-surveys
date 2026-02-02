import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyRepository } from '../../../domain/repositories/survey.repository';
import { Survey } from '../../../domain/entities/survey.entity';
import { SurveyOrmEntity } from '../entities/survey.orm-entity';
import { SurveyMapper } from '../../mappers/survey.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { ResponseOrmEntity } from '../entities/response.orm-entity';
import { SurveyResponse } from 'src/modules/survey/domain/entities/survey-response.entity';

@Injectable()
export class SurveyTypeOrmRepository implements SurveyRepository {
  constructor(
    @InjectRepository(SurveyOrmEntity)
    private readonly typeOrmRepository: Repository<SurveyOrmEntity>,

    @InjectRepository(ResponseOrmEntity)
    private readonly responseRepository: Repository<ResponseOrmEntity>,
  ) {}

  async save(survey: Survey): Promise<Survey> {
    const persistenceEntity = SurveyMapper.toPersistence(survey);

    const savedEntity = await this.typeOrmRepository.save(persistenceEntity);

    return SurveyMapper.toDomain(savedEntity);
  }

  async findById(id: number): Promise<Survey | null> {
    const entity = await this.typeOrmRepository.findOne({
      where: { id },
      relations: ['questions', 'createdBy'], // Relación con preguntas y usuario creador
      order: {
        questions: {
          id: 'ASC',
        },
      },
    });

    if (!entity) return null;

    return SurveyMapper.toDomain(entity);
  }

  async findByOwner(ownerId: number): Promise<Survey[]> {
    const entities = await this.typeOrmRepository.find({
      where: {
        createdBy: { id: ownerId },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    // Mapeo de entidades ORM a entidades de Dominio
    return entities.map((entity) => SurveyMapper.toDomain(entity));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findAll(): Promise<Survey[]> {
    return [];
  }

  async findResponses(surveyId: number): Promise<SurveyResponse[]> {
    const entities = await this.responseRepository.find({
      where: {
        survey: { id: surveyId },
      },
      relations: ['answers', 'survey', 'answers.question'], // Importante: traer las respuestas hijas
      order: {
        submittedAt: 'DESC',
      },
    });

    // Mapeamos de ORM a Dominio
    return entities.map((entity) => ResponseMapper.toDomain(entity));
  }

  async update(id: number, survey: Partial<Survey>): Promise<Survey> {
    await this.typeOrmRepository.update(id, survey);
    // Devuelve la entidad actualizada
    return this.findById(id) as Promise<Survey>;
  }

  async delete(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
