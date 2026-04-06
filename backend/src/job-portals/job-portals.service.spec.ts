import { Test, TestingModule } from '@nestjs/testing';
import { JobPortalsService } from './job-portals.service';

describe('JobPortalsService', () => {
  let service: JobPortalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobPortalsService],
    }).compile();

    service = module.get<JobPortalsService>(JobPortalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
