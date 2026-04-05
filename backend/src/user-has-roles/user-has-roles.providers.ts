import { USER_HAS_ROLES_REPOSITORY } from '../../constants';
import { UserHasRole } from './entities/user-has-role.entity';

export const userHasRolesProviders = [
  {
    provide: USER_HAS_ROLES_REPOSITORY,
    useValue: UserHasRole,
  },
];
