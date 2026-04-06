import { Module } from '@nestjs/common';
import { TagUsedService } from './tag-used.service';
import { TagUsedController } from './tag-used.controller';
import { tagUsedProviders } from './tag-used.providers';

@Module({
  controllers: [TagUsedController],
  providers: [TagUsedService, ...tagUsedProviders],
})
export class TagUsedModule {}
