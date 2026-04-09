import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'user_has_roles',
  paranoid: true,
})
export class UserHasRole extends Model<UserHasRole> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  // user has role properties

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  contactNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  businessType?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  businessName?: string;
}
