import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  content?: string;

  @IsNumber()
  createdBy: number;

  @IsString()
  tags?: string;

  @IsBoolean()
  isActive?: boolean;
}
