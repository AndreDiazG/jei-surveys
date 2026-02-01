import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SubmitResponseUseCase } from '../../application/use-cases/submit-response.usecase';
import {
  SubmitResponseDto,
  SubmitResponseBodyDto,
} from '../../application/dtos/submit-response.dto';

@Controller('surveys/:surveyId/responses')
export class ResponseController {
  constructor(private readonly submitResponseUseCase: SubmitResponseUseCase) {}

  @Post()
  async submit(
    @Param('surveyId', ParseIntPipe) surveyId: number,
    @Body() bodyDto: SubmitResponseBodyDto, // DTO sin ID
  ) {
    // DTO completo para el dominio
    const fullDto: SubmitResponseDto = {
      ...bodyDto,
      surveyId,
    };

    return await this.submitResponseUseCase.execute(fullDto);
  }
}
