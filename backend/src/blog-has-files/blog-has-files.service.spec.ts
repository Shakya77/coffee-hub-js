import { Test, TestingModule } from '@nestjs/testing';
import { BlogHasFilesService } from './blog-has-files.service';

describe('BlogHasFilesService', () => {
  let service: BlogHasFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogHasFilesService],
    }).compile();

    service = module.get<BlogHasFilesService>(BlogHasFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
