import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateJobSeekerDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  jobId: number;

  @IsString()
  status?: string;

  @IsBoolean()
  isActive?: boolean;
}
