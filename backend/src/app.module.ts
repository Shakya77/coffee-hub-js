import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UserHasRolesModule } from './user-has-roles/user-has-roles.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { TagUsedModule } from './tag-used/tag-used.module';
import { ProductHasImagesModule } from './product-has-images/product-has-images.module';
import { BlogsModule } from './blogs/blogs.module';
import { BlogHasFilesModule } from './blog-has-files/blog-has-files.module';
import { JobPortalsModule } from './job-portals/job-portals.module';
import { JobSeekersModule } from './job-seekers/job-seekers.module';
import { DiseasesModule } from './diseases/diseases.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    UserHasRolesModule,
    RolesModule,
    CategoriesModule,
    ProductsModule,
    TagsModule,
    TagUsedModule,
    ProductHasImagesModule,
    BlogsModule,
    BlogHasFilesModule,
    JobPortalsModule,
    JobSeekersModule,
    DiseasesModule,
    AuditLogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
