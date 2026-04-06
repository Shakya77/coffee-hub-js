import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  details?: string;

  @IsNumber()
  categoryId: number;

  @IsString()
  tags?: string;

  @IsNumber()
  vendorId?: number;
}
