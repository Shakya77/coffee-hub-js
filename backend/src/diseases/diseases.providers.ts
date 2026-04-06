import { DISEASE_REPOSITORY } from '../../constants';
import { Disease } from './entities/disease.entity';

export const diseasesProviders = [
  {
    provide: DISEASE_REPOSITORY,
    useValue: Disease,
  },
];
