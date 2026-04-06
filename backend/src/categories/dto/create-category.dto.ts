import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  details?: string;

  @IsNumber()
  parentId?: number;

  @IsBoolean()
  isActive?: boolean;
}
