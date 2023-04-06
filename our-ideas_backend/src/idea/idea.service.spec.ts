import { Test, TestingModule } from '@nestjs/testing';
import { IdeaService } from './idea.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Idea } from './schema/idea.schema';
import { promises } from 'dns';

describe('IdeaService', () => {
  let service: IdeaService;
  let model: Model<Idea>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdeaService,
        {
          provide: getModelToken('Idea'),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<IdeaService>(IdeaService);
    model = module.get<Model<Idea>>(getModelToken(Idea.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should insert new idea', async () => {
      const mockIdea: Idea = {
        title: 'Idea #1',
        description: 'Description #1',
      };
      const mockDocument = new model(mockIdea);
      jest.spyOn(model, 'create').mockResolvedValueOnce(mockDocument);
  
      const newIdea = await service.create(mockIdea);
      expect(newIdea).toEqual(mockIdea);
    });
  });
});
