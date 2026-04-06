import { BLOG_REPOSITORY } from '../../constants';
import { Blog } from './entities/blog.entity';

export const blogsProviders = [
  {
    provide: BLOG_REPOSITORY,
    useValue: Blog,
  },
];
