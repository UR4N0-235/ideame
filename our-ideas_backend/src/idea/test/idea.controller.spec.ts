import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from '../idea.controller';
import { IdeaService } from '../idea.service';
import { Idea } from '../schema/idea.schema';

const mockIdea = (
  id = 'a uuid',
  title = 'idea',
  description = 'description',
): Idea => ({
  id,
  title,
  description,
});

const ideaArray = [
  mockIdea('a uuid #1', 'idea #1', 'description #1'),
  mockIdea('a uuid #2', 'idea #2', 'description #2'),
  mockIdea('a uuid #3', 'idea #3', 'description #3'),
];

describe('IdeaController', () => {
  let ideaController: IdeaController;
  let ideaService: IdeaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeaController],
      providers: [
        {
          provide: IdeaService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockIdea()),
            findAll: jest.fn().mockResolvedValue(ideaArray),
            findById: jest.fn().mockResolvedValue(ideaArray[0]),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    ideaController = module.get<IdeaController>(IdeaController);
    ideaService = module.get<IdeaService>(IdeaService);
  });

  it('should be defined', () => {
    expect(ideaController).toBeDefined();
  });

  describe('route to creating new idea', () => {
    it('should be create new idea', async () => {
      const result = await ideaController.create(mockIdea());
      expect(result).toEqual(mockIdea());
    });

    it('should throw an error', () => {
      jest.spyOn(ideaService, 'create').mockRejectedValueOnce(new Error());
      expect(ideaService.create(mockIdea())).rejects.toThrowError();
    });
  });

  describe('route to getAll', () => {
    it('should be find all ideas', async () => {
      const result = await ideaController.getAll();
      expect(result).toEqual(ideaArray);
      expect(typeof result).toEqual('object');
      expect(ideaService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      jest.spyOn(ideaService, 'findAll').mockRejectedValueOnce(new Error());
      expect(ideaController.getAll()).rejects.toThrowError();
    });
  });

  describe('route to getOne', () => {
    it('should be find only one idea', async () => {
      const result = await ideaController.getOne('a uuid #1');
      expect(result).toEqual(ideaArray[0]);
      expect(typeof result).toEqual('object');
      expect(ideaService.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      jest.spyOn(ideaService, 'findById').mockRejectedValueOnce(new Error());
      expect(ideaController.getOne('1')).rejects.toThrowError();
    });
  });
});
