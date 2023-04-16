import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { IdeaService } from '../idea.service';
import { createMock } from '@golevelup/ts-jest';
import { Model, Query } from 'mongoose';
import { Idea, IdeaDocument } from '../schema/idea.schema';

const mockIdea = (
  id = 'a uuid',
  title = 'idea',
  description = 'description',
): Idea => ({
  id,
  title,
  description,
});

const mockIdeaDocument = (mock?: Partial<Idea>): Partial<IdeaDocument> => ({
  id: mock?.id || 'a uuid',
  title: mock?.title || 'idea',
  description: mock?.description || 'description',
});

const ideaArray = [
  mockIdea('a uuid #1', 'idea #1', 'description #1'),
  mockIdea('a uuid #2', 'idea #2', 'description #2'),
  mockIdea('a uuid #3', 'idea #3', 'description #3'),
];

const ideaDocumentArray = [
  mockIdeaDocument({
    id: 'a uuid #1',
    title: 'idea #1',
    description: 'description #1',
  }),
  mockIdeaDocument({
    id: 'a uuid #2',
    title: 'idea #2',
    description: 'description #2',
  }),
  mockIdeaDocument({
    id: 'a uuid #3',
    title: 'idea #3',
    description: 'description #3',
  }),
];

describe('IdeaService', () => {
  let ideaService: IdeaService;
  let ideaModel: Model<IdeaDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdeaService,
        {
          provide: getModelToken('Idea'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockIdea()),
            constructor: jest.fn().mockResolvedValue(mockIdea()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    ideaService = module.get<IdeaService>(IdeaService);
    ideaModel = module.get<Model<IdeaDocument>>(getModelToken('Idea'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(ideaService).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return a idea list', async () => {
      jest.spyOn(ideaModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(ideaDocumentArray),
      } as any);
      const ideas = await ideaService.findAll();
      expect(ideas).toEqual(ideaArray);
    });
  });

  describe('findById()', () => {
    it('should return a idea', async () => {
      jest.spyOn(ideaModel, 'findOne').mockReturnValueOnce(
        createMock<Query<IdeaDocument, IdeaDocument>>({
          exec: jest.fn().mockResolvedValueOnce(
            mockIdeaDocument({
              id: 'a uuid',
              title: 'idea #1',
              description: 'description #1',
            }),
          ),
        }) as any,
      );
    });
  });

  // describe('create()', () => {
  //   it('should insert new idea', async () => {
  //     jest.spyOn(ideaModel, 'create')
  //     const newIdea = await ideaService.create({
  //       title: 'Idea #1',
  //       description: 'Description #1',
  //     });
  //     expect(newIdea).toEqual(mockIdea);
  //   });
  // });
});
