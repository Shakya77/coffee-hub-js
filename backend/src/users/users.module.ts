import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { UserHasRolesModule } from 'src/user-has-roles/user-has-roles.module';
import { RolesModule } from 'src/roles/roles.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, UserHasRolesModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
