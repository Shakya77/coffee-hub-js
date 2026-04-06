import { IsNumber, IsString } from 'class-validator';

export class CreateJobPortalDto {
  @IsString()
  name: string;

  @IsString()
  post: string;

  @IsNumber()
  jobProvider: number;

  @IsString()
  description?: string;

  @IsString()
  tenure?: string;
}
