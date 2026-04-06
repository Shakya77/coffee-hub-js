import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_REPOSITORY } from '../../constants';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private productRepository: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.create(
      createProductDto as any as Product,
    );
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async findOne(id: number) {
    return await this.productRepository.findByPk(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }

    return await product.update(updateProductDto as any as Product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }

    return await product.destroy();
  }
}
