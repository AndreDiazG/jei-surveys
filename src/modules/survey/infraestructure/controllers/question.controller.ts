import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateQuestionUseCase } from '../../application/use-cases/create-question.usecase';
import {
  CreateQuestionDto,
  CreateQuestionBodyDto,
} from '../../application/dtos/create-question.dto';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';

@Controller('surveys/:surveyId/questions')
export class QuestionController {
  constructor(private readonly createQuestionUseCase: CreateQuestionUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('surveyId', ParseIntPipe) surveyId: number,
    @Body() bodyDto: CreateQuestionBodyDto,
  ) {
    const fullDto: CreateQuestionDto = {
      ...bodyDto,
      surveyId: surveyId,
    };

    return await this.createQuestionUseCase.execute(fullDto);
  }
}
