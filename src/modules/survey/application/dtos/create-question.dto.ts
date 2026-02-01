import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';
import {
  ChoiceOptionsDto,
  MultipleChoiceOptionsDto,
  RatingOptionsDto,
  TextOptionsDto,
  BooleanOptionsDto,
} from './question-options.dto';
import type { QuestionType } from '../../domain/types/question-options.types';

export class CreateQuestionDto {
  @IsInt()
  surveyId: number;

  @IsString()
  text: string;

  @IsString()
  // Validamos que el tipo sea uno de los permitidos
  @IsEnum(['single-choice', 'multiple-choice', 'rating', 'text', 'boolean'])
  type: QuestionType;

  @IsOptional()
  @ValidateNested()
  @Type((opts) => {
    // opts.object es el JSON completo que llega del request
    const type = opts?.object?.type;

    switch (type) {
      case 'single-choice':
        return ChoiceOptionsDto;
      case 'multiple-choice':
        return MultipleChoiceOptionsDto;
      case 'rating':
        return RatingOptionsDto;
      case 'text':
        return TextOptionsDto;
      case 'boolean':
        return BooleanOptionsDto;
      default:
        return TextOptionsDto;
    }
  })
  options?:
    | ChoiceOptionsDto
    | MultipleChoiceOptionsDto
    | RatingOptionsDto
    | TextOptionsDto
    | BooleanOptionsDto;

  @IsBoolean()
  @IsOptional()
  required?: boolean;
}

export class CreateQuestionBodyDto extends OmitType(CreateQuestionDto, [
  'surveyId',
] as const) {}
