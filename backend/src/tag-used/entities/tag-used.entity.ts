import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Tag } from 'src/tags/entities/tag.entity';

@Table({
  tableName: 'tag_used',
  paranoid: true,
})
export class TagUsed extends Model<TagUsed> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tagId: number;

  @BelongsTo(() => Tag)
  tag: Tag;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usedId: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
