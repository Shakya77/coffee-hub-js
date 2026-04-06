import { PartialType } from '@nestjs/mapped-types';
import { CreateProductHasImageDto } from './create-product-has-image.dto';

export class UpdateProductHasImageDto extends PartialType(
  CreateProductHasImageDto,
) {}
