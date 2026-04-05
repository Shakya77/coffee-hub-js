import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserHasRolesService } from './user-has-roles.service';
import { CreateUserHasRoleDto } from './dto/create-user-has-role.dto';
import { UpdateUserHasRoleDto } from './dto/update-user-has-role.dto';

@Controller('user-has-roles')
export class UserHasRolesController {
  constructor(private readonly userHasRolesService: UserHasRolesService) {}

  @Post()
  create(@Body() createUserHasRoleDto: CreateUserHasRoleDto) {
    return this.userHasRolesService.create(createUserHasRoleDto);
  }

  @Get()
  findAll() {
    return this.userHasRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userHasRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserHasRoleDto: UpdateUserHasRoleDto) {
    return this.userHasRolesService.update(+id, updateUserHasRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userHasRolesService.remove(+id);
  }
}
