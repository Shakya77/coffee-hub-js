import { Sequelize } from 'sequelize-typescript';
import { Role } from 'src/roles/entities/role.entity';
import { UserHasRole } from 'src/user-has-roles/entities/user-has-role.entity';
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

      sequelize.addModels([User, Role, UserHasRole]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
