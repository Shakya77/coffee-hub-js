import { Inject, Injectable } from '@nestjs/common';
import { CreateProductHasImageDto } from './dto/create-product-has-image.dto';
import { UpdateProductHasImageDto } from './dto/update-product-has-image.dto';
import { PRODUCT_HAS_IMAGE_REPOSITORY } from '../../constants';
import { ProductHasImage } from './entities/product-has-image.entity';

@Injectable()
export class ProductHasImagesService {
  constructor(
    @Inject(PRODUCT_HAS_IMAGE_REPOSITORY)
    private productHasImageRepository: typeof ProductHasImage,
  ) {}

  async create(createProductHasImageDto: CreateProductHasImageDto) {
    return await this.productHasImageRepository.create(
      createProductHasImageDto as any as ProductHasImage,
    );
  }

  async findAll() {
    return await this.productHasImageRepository.findAll();
  }

  async findOne(id: number) {
    return await this.productHasImageRepository.findByPk(id);
  }

  async update(id: number, updateProductHasImageDto: UpdateProductHasImageDto) {
    const image = await this.productHasImageRepository.findByPk(id);
    if (!image) {
      throw new Error('ProductHasImage not found');
    }

    return await image.update(
      updateProductHasImageDto as any as ProductHasImage,
    );
  }

  async remove(id: number) {
    const image = await this.productHasImageRepository.findByPk(id);
    if (!image) {
      throw new Error('ProductHasImage not found');
    }

    return await image.destroy();
  }
}
