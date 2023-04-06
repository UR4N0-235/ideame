import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { Idea } from './schema/idea.schema';

describe('IdeaController', () => {
  let controller: IdeaController;
  let service: IdeaService;

  const createIdea: Idea = {
    title: 'Idea #1',
    description: 'Description #1',
  };

  const mockIdea = {
    title: 'Idea #1',
    description: 'Description #1',
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeaController],
      providers: [
        {
          provide: IdeaService,
          useValue: {
            create: jest.fn().mockResolvedValue(createIdea),
          },
        },
      ],
    }).compile();

    controller = module.get<IdeaController>(IdeaController);
    service = module.get<IdeaService>(IdeaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should be create new idea', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockIdea);
      await controller.create(createIdea);
      expect(createSpy).toHaveBeenCalledWith(createIdea);
    });
  });
});
