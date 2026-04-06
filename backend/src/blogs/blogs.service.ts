import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BLOG_REPOSITORY } from '../../constants';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @Inject(BLOG_REPOSITORY)
    private blogRepository: typeof Blog,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    return await this.blogRepository.create(createBlogDto as any as Blog);
  }

  async findAll() {
    return await this.blogRepository.findAll();
  }

  async findOne(id: number) {
    return await this.blogRepository.findByPk(id);
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepository.findByPk(id);
    if (!blog) {
      throw new Error('Blog not found');
    }

    return await blog.update(updateBlogDto as any as Blog);
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findByPk(id);
    if (!blog) {
      throw new Error('Blog not found');
    }

    return await blog.destroy();
  }
}
