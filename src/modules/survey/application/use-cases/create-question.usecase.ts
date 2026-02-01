import { Inject, Injectable } from '@nestjs/common';
import type { QuestionRepository } from '../../domain/repositories/question.repository';
import { Question } from '../../domain/entities/question.entity';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { QuestionOptions } from '../../domain/types/question-options.types';

@Injectable()
export class CreateQuestionUseCase {
  constructor(
    @Inject('QuestionRepository')
    private readonly questionRepository: QuestionRepository,
  ) {}

  async execute(dto: CreateQuestionDto): Promise<Question> {
    const newQuestion = new Question(
      dto.surveyId,
      dto.text,
      dto.type,
      (dto.options || {}) as QuestionOptions,
      dto.required,
    );

    return await this.questionRepository.save(newQuestion);
  }
}
