import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from './schema/idea.schema';

@Injectable()
export class IdeaService {
  constructor(
    @InjectModel(Idea.name) private readonly ideaModel: Model<Idea>,
  ) {}

  async create(doc: Idea): Promise<Idea> {
    const result = await new this.ideaModel(doc).save();
    return result;
  }
}
