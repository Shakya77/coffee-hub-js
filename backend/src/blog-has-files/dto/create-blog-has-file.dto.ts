import { IsNumber, IsString } from 'class-validator';

export class CreateBlogHasFileDto {
  @IsString()
  type: string;

  @IsString()
  size?: string;

  @IsString()
  filepath: string;

  @IsString()
  metaDescription?: string;

  @IsNumber()
  blogId: number;

  @IsNumber()
  createdBy: number;
}
