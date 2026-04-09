import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'audit_logs',
  paranoid: true,
})
export class AuditLog extends Model<AuditLog> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment:
      'Action performed (LOGIN, LOGOUT, CREATE, UPDATE, DELETE, ROLE_CHANGE, etc)',
  })
  action: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Resource type affected (User, Product, Role, etc)',
  })
  resource: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: 'ID of the affected resource',
  })
  resourceId: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    comment: 'Previous value for UPDATE operations',
  })
  oldValue: any;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    comment: 'New value for CREATE/UPDATE operations',
  })
  newValue: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ipAddress: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  userAgent: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  statusCode: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: 'Additional details about the action',
  })
  details: string;
}
