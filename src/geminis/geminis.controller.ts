import { Body, Controller, Param, Post } from '@nestjs/common';
import { GeminisService } from './geminis.service';
import { CreateQuestionDto } from './dto/question.dto';

@Controller('geminis')
export class GeminisController {
  constructor(private readonly geminisService: GeminisService) {}

  @Post('document/:id')
  async getAnswer(
    @Param('id') id: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return await this.geminisService.getAnswer(id, createQuestionDto.question);
  }
}
