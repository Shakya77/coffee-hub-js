import { TAG_REPOSITORY } from '../../constants';
import { Tag } from './entities/tag.entity';

export const tagsProviders = [
  {
    provide: TAG_REPOSITORY,
    useValue: Tag,
  },
];
