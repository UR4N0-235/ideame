import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { IdeaService } from './idea.service';
import { Idea, IdeaDocument, IdeaSchema } from './schema/idea.schema';
import { Model } from 'mongoose';

const mockIdea = {
  title: 'Idea #1',
  description: 'Description #1',
};

describe('IdeaService', () => {
  let ideaService: IdeaService;
  let ideaModel: Model<IdeaDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdeaService,
        {
          provide: getModelToken('Idea'),
          useFactory: () => ({
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          }),
        },
      ],
    }).compile();

    ideaService = module.get<IdeaService>(IdeaService);
    ideaModel = module.get<Model<IdeaDocument>>(getModelToken('Idea'));
  });

  it('should be defined', () => {
    expect(ideaService).toBeDefined();
  });

  describe('create()', () => {
    it('should insert new idea', async () => {
      jest.spyOn(ideaModel, 'create')
      
      const newIdea = await ideaService.create({
        title: 'Idea #1',
        description: 'Description #1',
      });
      expect(newIdea).toEqual(mockIdea);
    });
  });
});
