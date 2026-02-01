import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionRepository } from '../../../domain/repositories/question.repository';
import { Question } from '../../../domain/entities/question.entity';
import { QuestionOrmEntity } from '../entities/question.orm-entity';
import { QuestionMapper } from '../../mappers/question.mapper';

@Injectable()
export class QuestionTypeOrmRepository implements QuestionRepository {
  constructor(
    @InjectRepository(QuestionOrmEntity)
    private readonly repository: Repository<QuestionOrmEntity>,
  ) {}

  async save(question: Question): Promise<Question> {
    const persistenceEntity = QuestionMapper.toPersistence(question);
    const savedEntity = await this.repository.save(persistenceEntity);
    return QuestionMapper.toDomain(savedEntity);
  }
}
