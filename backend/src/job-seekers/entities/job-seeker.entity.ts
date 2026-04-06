import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { JobPortal } from 'src/job-portals/entities/job-portal.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'job_seekers',
  paranoid: true,
})
export class JobSeeker extends Model<JobSeeker> {
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
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => JobPortal)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  jobId: number;

  @BelongsTo(() => JobPortal)
  job: JobPortal;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
