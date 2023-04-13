import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from './schema/idea.schema';

@Injectable()
export class IdeaService {
  constructor(
    @InjectModel(Idea.name) private readonly ideaModel: Model<Idea>,
  ) {}

  async create(idea: Idea): Promise<Idea> {
    return await this.ideaModel.create(idea);
  }

  async findAll(): Promise<Idea[]> {
    throw NotImplementedException;
  }

  async findById(): Promise<Idea[]> {
    throw NotImplementedException;
  }
}
