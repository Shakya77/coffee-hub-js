import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { tagsProviders } from './tags.providers';

@Module({
  controllers: [TagsController],
  providers: [TagsService, ...tagsProviders],
})
export class TagsModule {}
