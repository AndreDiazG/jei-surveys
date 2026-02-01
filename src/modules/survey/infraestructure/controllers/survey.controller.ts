import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateSurveyUseCase } from '../../application/use-cases/create-survey.usecase';
import { GetSurveyUseCase } from '../../application/use-cases/get-survey.usecase';
import { GetUserSurveysUseCase } from '../../application/use-cases/get-user-surveys.usecase';
import { CreateSurveyDto } from '../../application/dtos/create-survey.dto';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import type { UserContext } from '../../../../modules/auth/application/interfaces/auth.interfaces';

@Controller('surveys')
export class SurveyController {
  constructor(
    private readonly createSurveyUseCase: CreateSurveyUseCase,
    private readonly getSurveyUseCase: GetSurveyUseCase,
    private readonly getUserSurveysUseCase: GetUserSurveysUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Solo permite usuarios logueados
  async create(
    @Body() dto: CreateSurveyDto,
    @CurrentUser() user: UserContext, // Obtenemos el usuario del token
  ) {
    // El user.id viene del token.
    return await this.createSurveyUseCase.execute(dto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllMySurveys(@CurrentUser() user: UserContext) {
    return await this.getUserSurveysUseCase.execute(user.id);
  }

  @Get(':id')
  // No se usa @UseGuards dado que la encuesta es pública para responder.
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getSurveyUseCase.execute(id);
  }
}
