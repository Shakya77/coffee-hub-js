import { Test, TestingModule } from '@nestjs/testing';
import { BlogHasFilesController } from './blog-has-files.controller';
import { BlogHasFilesService } from './blog-has-files.service';

describe('BlogHasFilesController', () => {
  let controller: BlogHasFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogHasFilesController],
      providers: [BlogHasFilesService],
    }).compile();

    controller = module.get<BlogHasFilesController>(BlogHasFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
