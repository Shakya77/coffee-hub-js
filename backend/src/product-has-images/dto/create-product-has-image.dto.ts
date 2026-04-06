import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductHasImageDto {
  @IsString()
  name: string;

  @IsString()
  size?: string;

  @IsNumber()
  productId: number;

  @IsString()
  filepath: string;

  @IsBoolean()
  isActive?: boolean;
}
