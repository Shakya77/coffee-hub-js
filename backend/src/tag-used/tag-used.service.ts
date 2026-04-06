import { Inject, Injectable } from '@nestjs/common';
import { CreateTagUsedDto } from './dto/create-tag-used.dto';
import { UpdateTagUsedDto } from './dto/update-tag-used.dto';
import { TAG_USED_REPOSITORY } from '../../constants';
import { TagUsed } from './entities/tag-used.entity';

@Injectable()
export class TagUsedService {
  constructor(
    @Inject(TAG_USED_REPOSITORY)
    private tagUsedRepository: typeof TagUsed,
  ) {}

  async create(createTagUsedDto: CreateTagUsedDto) {
    return await this.tagUsedRepository.create(
      createTagUsedDto as any as TagUsed,
    );
  }

  async findAll() {
    return await this.tagUsedRepository.findAll();
  }

  async findOne(id: number) {
    return await this.tagUsedRepository.findByPk(id);
  }

  async update(id: number, updateTagUsedDto: UpdateTagUsedDto) {
    const tagUsed = await this.tagUsedRepository.findByPk(id);
    if (!tagUsed) {
      throw new Error('TagUsed not found');
    }

    return await tagUsed.update(updateTagUsedDto as any as TagUsed);
  }

  async remove(id: number) {
    const tagUsed = await this.tagUsedRepository.findByPk(id);
    if (!tagUsed) {
      throw new Error('TagUsed not found');
    }

    return await tagUsed.destroy();
  }
}
