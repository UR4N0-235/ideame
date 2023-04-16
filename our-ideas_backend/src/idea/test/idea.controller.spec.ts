import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from '../idea.controller';
import { IdeaService } from '../idea.service';
import { Idea } from '../schema/idea.schema';

const newIdea: Idea = {
  title: 'Idea #1',
  description: 'Description #1',
};

const ideasList: Idea[] = [
  new Idea({ title: 'title #1', description: 'description #1' }),
  new Idea({ title: 'title #2', description: 'description #2' }),
  new Idea({ title: 'title #3', description: 'description #3' }),
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
            create: jest.fn().mockResolvedValue(newIdea),
            findAll: jest.fn(),
            findById: jest.fn(),
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
      const result = await ideaController.create(newIdea);
      expect(result).toEqual(newIdea);
    });

    it('should throw an error', () => {
      jest.spyOn(ideaService, 'create').mockRejectedValueOnce(new Error());
      expect(ideaService.create(newIdea)).rejects.toThrowError();
    });
  });

  describe('route to getAll', () => {
    it('should be find all ideas', async () => {
      const result = await ideaController.getAll();
      expect(result).toEqual(ideasList);
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
      const result = await ideaController.getOne('1');
      expect(result).toEqual(ideasList[0]);
      expect(typeof result).toEqual('object');
      expect(ideaService.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      jest.spyOn(ideaService, 'findById').mockRejectedValueOnce(new Error());
      expect(ideaController.getOne('1')).rejects.toThrowError();
    });
  });
});
