import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/roles/entities/role.entity';
import { Inject } from '@nestjs/common';
import { USER_HAS_ROLES_REPOSITORY } from '../../constants';
import { UserHasRole } from 'src/user-has-roles/entities/user-has-role.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(USER_HAS_ROLES_REPOSITORY)
    private userHasRolesRepository: typeof UserHasRole,
  ) {}

  async login(user: any) {
    const check = await this.usersService.findOneEmail(user.email);

    if (!check) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(user.password, check.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (check.isActive === false) {
      throw new UnauthorizedException(
        'Account is inactive. Please contact admin.',
      );
    }

    const roles = (check.userHasRoles ?? [])
      .map((item: any) => item?.role?.slug)
      .filter((slug: string | undefined): slug is string => Boolean(slug));

    const uniqueRoles = [...new Set(roles)];
    const primaryRole = uniqueRoles[0];

    const payload = {
      email: check.email,
      id: check.id,
      slug: check.slug,
      role: primaryRole,
      roles: uniqueRoles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserRoles(userId: number) {
    const userRoles = await this.userHasRolesRepository.findAll({
      where: { userId },
      include: [
        {
          association: 'role',
          attributes: ['id', 'name', 'slug', 'description', 'isActive'],
        },
      ],
    });

    if (!userRoles || userRoles.length === 0) {
      throw new NotFoundException('No roles found for this user');
    }

    return {
      roles: userRoles.map((uhr: any) => ({
        id: uhr.role?.id,
        name: uhr.role?.name,
        slug: uhr.role?.slug,
        description: uhr.role?.description,
        contactNumber: uhr.contactNumber,
        businessName: uhr.businessName,
        businessType: uhr.businessType,
      })),
    };
  }
}
