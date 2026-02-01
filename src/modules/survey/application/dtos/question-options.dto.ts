import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';

//DTO para Selección Múltiple y Única
export class ChoiceOptionsDto {
  @IsArray()
  @IsString({ each: true }) // Valida que cada elemento del array sea string
  @ArrayMinSize(2) // Mínimo 2 opciones para elegir
  choices: string[];

  @IsBoolean()
  @IsOptional()
  allowOther?: boolean;
}

//DTO Específico para Múltiple
export class MultipleChoiceOptionsDto extends ChoiceOptionsDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  minSelection?: number;

  @IsNumber()
  @IsOptional()
  maxSelection?: number;
}

//DTO para Rating
export class RatingOptionsDto {
  @IsNumber()
  @Min(1) // El mínimo no puede ser 0
  min: number;

  @IsNumber()
  @Max(10)
  max: number;

  @IsNumber()
  @IsOptional()
  step?: number;

  @IsString()
  @IsOptional()
  minLabel?: string;

  @IsString()
  @IsOptional()
  maxLabel?: string;

  @IsString()
  @IsOptional()
  icon?: string;
}

//DTO para Texto
export class TextOptionsDto {
  @IsString()
  @IsOptional()
  placeholder?: string;

  @IsNumber()
  @IsOptional()
  maxLength?: number;

  @IsBoolean()
  @IsOptional()
  longText?: boolean;
}

//DTO para Boolean
export class BooleanOptionsDto {
  @IsString()
  @IsOptional()
  positiveLabel?: string;

  @IsString()
  @IsOptional()
  negativeLabel?: string;
}
