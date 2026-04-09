import { Sequelize } from 'sequelize-typescript';
import { BlogHasFile } from 'src/blog-has-files/entities/blog-has-file.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Disease } from 'src/diseases/entities/disease.entity';
import { JobPortal } from 'src/job-portals/entities/job-portal.entity';
import { JobSeeker } from 'src/job-seekers/entities/job-seeker.entity';
import { ProductHasImage } from 'src/product-has-images/entities/product-has-image.entity';
import { Product } from 'src/products/entities/product.entity';
import { Role } from 'src/roles/entities/role.entity';
import { TagUsed } from 'src/tag-used/entities/tag-used.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { UserHasRole } from 'src/user-has-roles/entities/user-has-role.entity';
import { User } from 'src/users/entities/user.entity';
import { AuditLog } from 'src/audit-logs/entities/audit-log.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'coffee_hub',
      });

      sequelize.addModels([
        User,
        Role,
        UserHasRole,
        Category,
        Product,
        Tag,
        TagUsed,
        ProductHasImage,
        Blog,
        BlogHasFile,
        JobPortal,
        JobSeeker,
        Disease,
        AuditLog,
      ]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
