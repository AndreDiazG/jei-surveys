import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateSurveyUseCase } from '../../application/use-cases/create-survey.usecase';
import { CreateSurveyDto } from '../../application/dtos/create-survey.dto';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import type { UserContext } from '../../../../modules/auth/application/interfaces/auth.interfaces';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly createSurveyUseCase: CreateSurveyUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Solo permite usuarios logueados
  async create(
    @Body() dto: CreateSurveyDto,
    @CurrentUser() user: UserContext, // <--- 2. Obtenemos el usuario del token
  ) {
    // El user.id viene del token, así que es seguro.
    return await this.createSurveyUseCase.execute(dto, user.id);
  }
}
