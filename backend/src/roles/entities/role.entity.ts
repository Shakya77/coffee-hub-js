import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum Roles {
  ADMIN = 'admin',
  AGRONOMIST = 'agronomist',
  VENDOR = 'vendor',
  FARMER = 'farmer',
}

@Table({
  tableName: 'roles',
  paranoid: true,
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
