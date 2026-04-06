import { Test, TestingModule } from '@nestjs/testing';
import { TagUsedController } from './tag-used.controller';
import { TagUsedService } from './tag-used.service';

describe('TagUsedController', () => {
  let controller: TagUsedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagUsedController],
      providers: [TagUsedService],
    }).compile();

    controller = module.get<TagUsedController>(TagUsedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
