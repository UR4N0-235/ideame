import {
  Body,
  Controller,
  NotImplementedException,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Idea } from './schema/idea.schema';

@Controller('idea')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}

  @Post()
  create(@Body() idea: Idea) {
    return this.ideaService.create(idea);
  }

  @Get('')
  getAll() {
    return this.ideaService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<Idea> {
    return this.ideaService.findById(id);
  }

  @Put('')
  update() {
    throw NotImplementedException;
  }

  @Delete('')
  delete() {
    throw NotImplementedException;
  }
}
