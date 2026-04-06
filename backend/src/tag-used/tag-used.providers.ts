import { TAG_USED_REPOSITORY } from '../../constants';
import { TagUsed } from './entities/tag-used.entity';

export const tagUsedProviders = [
  {
    provide: TAG_USED_REPOSITORY,
    useValue: TagUsed,
  },
];
