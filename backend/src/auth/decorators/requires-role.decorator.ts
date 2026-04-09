import { SetMetadata } from '@nestjs/common';

export const REQUIRES_ROLE_KEY = 'requires_role';

export const RequiresRole = (...roles: string[]) =>
  SetMetadata(REQUIRES_ROLE_KEY, roles);
