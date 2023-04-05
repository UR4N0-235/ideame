import * as mongoose from 'mongoose';

export const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export interface Idea {
  id: string;
  title: string;
  description: string;
}
