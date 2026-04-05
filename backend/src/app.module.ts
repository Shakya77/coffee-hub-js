import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserhasrolesModule } from './userhasroles/userhasroles.module';
import { UserHasRolesModule } from './user-has-roles/user-has-roles.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, UserRolesModule, UserhasrolesModule, UserHasRolesModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
