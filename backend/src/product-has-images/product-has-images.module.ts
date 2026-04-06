import { Module } from '@nestjs/common';
import { ProductHasImagesService } from './product-has-images.service';
import { ProductHasImagesController } from './product-has-images.controller';
import { productHasImagesProviders } from './product-has-images.providers';

@Module({
  controllers: [ProductHasImagesController],
  providers: [ProductHasImagesService, ...productHasImagesProviders],
})
export class ProductHasImagesModule {}
