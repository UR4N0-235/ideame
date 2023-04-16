import { Schema, Document } from 'mongoose';

export const IdeaSchema = new Schema({
  title: {
    type: String,
    requried: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export interface IdeaDocument extends Document {
  title: string;
  description: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
}
