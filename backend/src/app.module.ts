import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UserRolesModule } from './user-roles/user-roles.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, UserRolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
