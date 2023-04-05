import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeaSchema } from './idea.model/idea.model';

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
