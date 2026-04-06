import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORY_REPOSITORY } from '../../constants';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private categoryRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(
      createCategoryDto as any as Category,
    );
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }

    return await category.update(updateCategoryDto as any as Category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }

    return await category.destroy();
  }
}
