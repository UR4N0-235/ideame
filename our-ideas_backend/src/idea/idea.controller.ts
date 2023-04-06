import { Body, Controller, Post } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Idea } from './schema/idea.schema';

@Controller('idea')
export class IdeaController {
  constructor(private service: IdeaService) {}

  @Post('create')
  create(@Body() idea: Idea) {
    return this.service.create(idea);
  }
}
