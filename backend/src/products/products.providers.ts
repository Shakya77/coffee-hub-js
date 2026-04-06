import { PRODUCT_REPOSITORY } from '../../constants';
import { Product } from './entities/product.entity';

export const productsProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
