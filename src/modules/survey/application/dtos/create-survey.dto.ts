import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
