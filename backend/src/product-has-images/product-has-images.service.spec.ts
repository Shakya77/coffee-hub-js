import { Test, TestingModule } from '@nestjs/testing';
import { ProductHasImagesService } from './product-has-images.service';

describe('ProductHasImagesService', () => {
  let service: ProductHasImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductHasImagesService],
    }).compile();

    service = module.get<ProductHasImagesService>(ProductHasImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
