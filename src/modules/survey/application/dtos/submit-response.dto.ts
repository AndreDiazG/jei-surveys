import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

// Validador Personalizado
@ValidatorConstraint({ name: 'IsValidAnswer', async: false })
export class IsValidAnswerConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    const isString = typeof value === 'string';
    const isNumber = typeof value === 'number';
    const isBoolean = typeof value === 'boolean';
    const isStringArray =
      Array.isArray(value) && value.every((item) => typeof item === 'string');

    return isString || isNumber || isBoolean || isStringArray;
  }

  defaultMessage() {
    return 'El valor debe ser texto, número, booleano o lista de textos.';
  }
}

export class AnswerDto {
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @Validate(IsValidAnswerConstraint) // Uso del validador personalizado
  value: string | number | boolean | string[];
}

export class SubmitResponseDto {
  @IsNumber()
  surveyId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

// DTO para el Body excluyendo surveyId porque viene por URL
export class SubmitResponseBodyDto extends OmitType(SubmitResponseDto, [
  'surveyId',
] as const) {}
