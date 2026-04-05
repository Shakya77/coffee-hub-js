import { ROLE_REPOSITORY, USER_REPOSITORY,USER_HAS_ROLES_REPOSITORY } from '../../constants';
import { Role } from './entities/role.entity';
import { UserHasRoles } from './entities/user-has-roles.entity';
import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];

export const rolesProviders = [
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
];

export const userHasRolesProviders = [
  {
    provide: USER_HAS_ROLES_REPOSITORY,
    useValue: UserHasRoles,
  },
];
