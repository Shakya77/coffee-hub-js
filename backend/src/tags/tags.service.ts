import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TAG_REPOSITORY } from '../../constants';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @Inject(TAG_REPOSITORY)
    private tagRepository: typeof Tag,
  ) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.create(createTagDto as any as Tag);
  }

  async findAll() {
    return await this.tagRepository.findAll();
  }

  async findOne(id: number) {
    return await this.tagRepository.findByPk(id);
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepository.findByPk(id);
    if (!tag) {
      throw new Error('Tag not found');
    }

    return await tag.update(updateTagDto as any as Tag);
  }

  async remove(id: number) {
    const tag = await this.tagRepository.findByPk(id);
    if (!tag) {
      throw new Error('Tag not found');
    }

    return await tag.destroy();
  }
}
