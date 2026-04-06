import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogHasFileDto } from './dto/create-blog-has-file.dto';
import { UpdateBlogHasFileDto } from './dto/update-blog-has-file.dto';
import { BLOG_HAS_FILE_REPOSITORY } from '../../constants';
import { BlogHasFile } from './entities/blog-has-file.entity';

@Injectable()
export class BlogHasFilesService {
  constructor(
    @Inject(BLOG_HAS_FILE_REPOSITORY)
    private blogHasFileRepository: typeof BlogHasFile,
  ) {}

  async create(createBlogHasFileDto: CreateBlogHasFileDto) {
    return await this.blogHasFileRepository.create(
      createBlogHasFileDto as any as BlogHasFile,
    );
  }

  async findAll() {
    return await this.blogHasFileRepository.findAll();
  }

  async findOne(id: number) {
    return await this.blogHasFileRepository.findByPk(id);
  }

  async update(id: number, updateBlogHasFileDto: UpdateBlogHasFileDto) {
    const file = await this.blogHasFileRepository.findByPk(id);
    if (!file) {
      throw new Error('BlogHasFile not found');
    }

    return await file.update(updateBlogHasFileDto as any as BlogHasFile);
  }

  async remove(id: number) {
    const file = await this.blogHasFileRepository.findByPk(id);
    if (!file) {
      throw new Error('BlogHasFile not found');
    }

    return await file.destroy();
  }
}
