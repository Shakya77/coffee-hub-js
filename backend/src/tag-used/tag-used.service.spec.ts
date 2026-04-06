import { Test, TestingModule } from '@nestjs/testing';
import { TagUsedService } from './tag-used.service';

describe('TagUsedService', () => {
  let service: TagUsedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagUsedService],
    }).compile();

    service = module.get<TagUsedService>(TagUsedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
