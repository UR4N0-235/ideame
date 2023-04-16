import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './schema/idea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Idea',
        schema: IdeaSchema,
      },
    ]),
  ],
  providers: [IdeaService],
  controllers: [IdeaController],
})
export class IdeaModule {}
