import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from './schema/idea.schema';
import { IdeaDocument } from './schema/idea.schema';

@Injectable()
export class IdeaService {
  constructor(
    @InjectModel('Idea') private readonly ideaModel: Model<IdeaDocument>,
  ) {}

  async create(idea: Partial<Idea>): Promise<Idea> {
    const createdIdea = await this.ideaModel.create(idea);
    return {
      id: createdIdea._id,
      title: createdIdea.title,
      description: createdIdea.description,
    };
  }

  async findAll(): Promise<Idea[]> {
    const ideaDocuments = await this.ideaModel.find().exec();
    return ideaDocuments.map((idea) => ({
      id: idea._id,
      title: idea.title,
      description: idea.description,
    }));
  }

  async findById(id: string): Promise<Idea> {
    const idea = await this.ideaModel.findOne({ _id: id }).exec();
    return {
      id: idea._id,
      title: idea.title,
      description: idea.description,
    };
  }
}
