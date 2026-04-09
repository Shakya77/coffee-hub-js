import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { REQUIRES_ROLE_KEY } from '../decorators/requires-role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    // Check for @RequiresRole decorator (preferred)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      REQUIRES_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Fallback to @AllowedRoles decorator (legacy)
    const allowedRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const roles = requiredRoles || (allowedRoles ? [allowedRoles] : null);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.role as string;

    if (!userRole) {
      return false;
    }

    return roles.includes(userRole);
  }
}
