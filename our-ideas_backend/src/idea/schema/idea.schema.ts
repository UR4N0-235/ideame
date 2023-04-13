import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IdeaDocument = HydratedDocument<Idea>;

@Schema()
export class Idea {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  constructor(idea?: Partial<Idea>) {
    this.title = idea?.title;
    this.description = idea?.description;
  }
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
