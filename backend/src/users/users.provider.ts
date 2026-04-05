import {
  ROLE_REPOSITORY,
  USER_REPOSITORY,
  USER_HAS_ROLES_REPOSITORY,
} from '../../constants';
import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
