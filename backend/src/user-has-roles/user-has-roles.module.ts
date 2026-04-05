import { Module } from '@nestjs/common';
import { UserHasRolesService } from './user-has-roles.service';
import { UserHasRolesController } from './user-has-roles.controller';

@Module({
  controllers: [UserHasRolesController],
  providers: [UserHasRolesService],
})
export class UserHasRolesModule {}
