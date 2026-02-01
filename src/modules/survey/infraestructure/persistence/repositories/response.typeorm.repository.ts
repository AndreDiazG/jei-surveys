import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseRepository } from '../../../domain/repositories/response.repository';
import { SurveyResponse } from '../../../domain/entities/survey-response.entity';
import { ResponseOrmEntity } from '../entities/response.orm-entity';
import { ResponseMapper } from '../../mappers/response.mapper';

@Injectable()
export class ResponseTypeOrmRepository implements ResponseRepository {
  constructor(
    @InjectRepository(ResponseOrmEntity)
    private readonly repository: Repository<ResponseOrmEntity>,
  ) {}

  async save(response: SurveyResponse): Promise<SurveyResponse> {
    const entity = ResponseMapper.toPersistence(response);
    const savedEntity = await this.repository.save(entity);

    // Se devuelve el objeto de dominio con los datos generados
    return new SurveyResponse(
      response.surveyId,
      response.answers,
      savedEntity.id,
      savedEntity.submittedAt,
    );
  }
}
