import { Test, TestingModule } from '@nestjs/testing';
import { JobPortalsController } from './job-portals.controller';
import { JobPortalsService } from './job-portals.service';

describe('JobPortalsController', () => {
  let controller: JobPortalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPortalsController],
      providers: [JobPortalsService],
    }).compile();

    controller = module.get<JobPortalsController>(JobPortalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
