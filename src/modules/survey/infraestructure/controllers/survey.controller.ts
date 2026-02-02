import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateSurveyUseCase } from '../../application/use-cases/create-survey.usecase';
import { GetSurveyUseCase } from '../../application/use-cases/get-survey.usecase';
import { GetUserSurveysUseCase } from '../../application/use-cases/get-user-surveys.usecase';
import { CreateSurveyDto } from '../../application/dtos/create-survey.dto';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import type { UserContext } from '../../../../modules/auth/application/interfaces/auth.interfaces';
import { GetSurveyResponsesUseCase } from '../../application/use-cases/get-survey-responses.usecase';
import { SurveyResponse } from '../../domain/entities/survey-response.entity';
import { DeleteSurveyUseCase } from '../../application/use-cases/delete-survey.usecase';
import { UpdateSurveyUseCase } from '../../application/use-cases/update-survey.usecase';
import { UpdateSurveyDto } from '../../application/dtos/update-survey.dto';

@Controller('surveys')
export class SurveyController {
  constructor(
    private readonly createSurveyUseCase: CreateSurveyUseCase,
    private readonly getSurveyUseCase: GetSurveyUseCase,
    private readonly getUserSurveysUseCase: GetUserSurveysUseCase,
    private readonly getSurveyResponsesUseCase: GetSurveyResponsesUseCase,
    private readonly deleteSurveyUseCase: DeleteSurveyUseCase,
    private readonly updateSurveyUseCase: UpdateSurveyUseCase,
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

  @Get(':id/responses')
  @UseGuards(JwtAuthGuard)
  async getResponses(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SurveyResponse[]> {
    return await this.getSurveyResponsesUseCase.execute(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteSurveyUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSurveyDto) {
    return this.updateSurveyUseCase.execute(id, dto);
  }
}
