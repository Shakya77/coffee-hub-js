import { Test, TestingModule } from '@nestjs/testing';
import { ProductHasImagesController } from './product-has-images.controller';
import { ProductHasImagesService } from './product-has-images.service';

describe('ProductHasImagesController', () => {
  let controller: ProductHasImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductHasImagesController],
      providers: [ProductHasImagesService],
    }).compile();

    controller = module.get<ProductHasImagesController>(
      ProductHasImagesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
