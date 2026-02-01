import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyRepository } from '../../../domain/repositories/survey.repository';
import { Survey } from '../../../domain/entities/survey.entity';
import { SurveyOrmEntity } from '../entities/survey.orm-entity';
import { SurveyMapper } from '../../mappers/survey.mapper';

@Injectable()
export class SurveyTypeOrmRepository implements SurveyRepository {
  constructor(
    @InjectRepository(SurveyOrmEntity)
    private readonly typeOrmRepository: Repository<SurveyOrmEntity>,
  ) {}

  async save(survey: Survey): Promise<Survey> {
    const persistenceEntity = SurveyMapper.toPersistence(survey);

    const savedEntity = await this.typeOrmRepository.save(persistenceEntity);

    return SurveyMapper.toDomain(savedEntity);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findAll(): Promise<Survey[]> {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async findById(id: number): Promise<Survey | null> {
    return null;
  }
}
