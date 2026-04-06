import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Blog } from 'src/blogs/entities/blog.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'blog_has_files',
  paranoid: true,
})
export class BlogHasFile extends Model<BlogHasFile> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  size?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filepath: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  metaDescription?: string;

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  blogId: number;

  @BelongsTo(() => Blog)
  blog: Blog;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy: number;

  @BelongsTo(() => User)
  creator: User;
}
