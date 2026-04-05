import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { ROLE_REPOSITORY } from '../../constants';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private roleRepository: typeof Role,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(createRoleDto as any as Role);

    return role;
  }

  async findAll(isActive = true) {
    const data = await this.roleRepository.findAll({
      where: {
        isActive: isActive,
      },
      attributes: ['id', 'name', 'description'],
    });

    return data;
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findByPk(id);

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = (await this.roleRepository.findByPk(id)) as Role;
    await role.update(updateRoleDto as any as Role);

    return role;
  }

  async remove(id: number) {
    const role = (await this.roleRepository.findByPk(id)) as Role;
    await role.destroy();

    return role;
  }
}
