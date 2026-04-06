import { PRODUCT_HAS_IMAGE_REPOSITORY } from '../../constants';
import { ProductHasImage } from './entities/product-has-image.entity';

export const productHasImagesProviders = [
  {
    provide: PRODUCT_HAS_IMAGE_REPOSITORY,
    useValue: ProductHasImage,
  },
];
