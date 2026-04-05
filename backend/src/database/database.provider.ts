import { Sequelize } from 'sequelize-typescript';
import { Role } from 'src/users/entities/role.entity';
import { UserHasRoles } from 'src/users/entities/user-has-roles.entity';
import { User } from 'src/users/entities/user.entity';

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

      sequelize.addModels([User, Role, UserHasRoles]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
