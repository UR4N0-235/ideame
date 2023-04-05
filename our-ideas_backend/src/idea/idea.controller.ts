import { Body, Controller, Post } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Idea } from './idea.model/idea.model';

@Controller('idea')
export class IdeaController {
  constructor(private service: IdeaService) {}

  @Post('create')
  create(@Body() idea: Idea) {
    return this.service.create(idea);
  }
}
