import { Module } from '@nestjs/common';
import { BlogHasFilesService } from './blog-has-files.service';
import { BlogHasFilesController } from './blog-has-files.controller';
import { blogHasFilesProviders } from './blog-has-files.providers';

@Module({
  controllers: [BlogHasFilesController],
  providers: [BlogHasFilesService, ...blogHasFilesProviders],
})
export class BlogHasFilesModule {}
