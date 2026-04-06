import { BLOG_HAS_FILE_REPOSITORY } from '../../constants';
import { BlogHasFile } from './entities/blog-has-file.entity';

export const blogHasFilesProviders = [
  {
    provide: BLOG_HAS_FILE_REPOSITORY,
    useValue: BlogHasFile,
  },
];
