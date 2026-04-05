import { Inject, Injectable } from '@nestjs/common';
import { CreateUserHasRoleDto } from './dto/create-user-has-role.dto';
import { UpdateUserHasRoleDto } from './dto/update-user-has-role.dto';
import { USER_HAS_ROLES_REPOSITORY } from '../../constants';
import { UserHasRole } from './entities/user-has-role.entity';

@Injectable()
export class UserHasRolesService {
  constructor(
    @Inject(USER_HAS_ROLES_REPOSITORY)
    private userHasRolesRepository: typeof UserHasRole,
  ) {}

  async create(createUserHasRoleDto: CreateUserHasRoleDto) {
    const data = await this.userHasRolesRepository.create(
      createUserHasRoleDto as any as UserHasRole,
    );

    return data;
  }

  async findAll() {
    return await this.userHasRolesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userHasRolesRepository.findByPk(id);
  }

  async update(id: number, updateUserHasRoleDto: UpdateUserHasRoleDto) {
    const userHasRole = await this.userHasRolesRepository.findByPk(id);
    if (!userHasRole) {
      throw new Error('UserHasRole not found');
    }
    return await userHasRole.update(updateUserHasRoleDto as any as UserHasRole);
  }

  async remove(id: number) {
    const userHasRole = await this.userHasRolesRepository.findByPk(id);
    if (!userHasRole) {
      throw new Error('UserHasRole not found');
    }
    return await userHasRole.destroy();
  }
}
