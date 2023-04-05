import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from './idea.model/idea.model';
import { Model } from 'mongoose';

@Injectable()
export class IdeaService {
  constructor(@InjectModel('Idea') private readonly ideaModel: Model<Idea>) {}
  async create(doc: Idea) {
    const result = await new this.ideaModel(doc).save();
    return result.id;
  }
}
