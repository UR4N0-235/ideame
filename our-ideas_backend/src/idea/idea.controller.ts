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
  constructor(private service: IdeaService) {}

  @Post('create')
  create(@Body() idea: Idea) {
    return this.service.create(idea);
  }

  @Get('')
  getAll() {
    throw NotImplementedException;
  }

  @Get('')
  getOne(@Param() id: string) {
    throw NotImplementedException;
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
