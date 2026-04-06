import { IsBoolean, IsNumber } from 'class-validator';

export class CreateTagUsedDto {
  @IsNumber()
  tagId: number;

  @IsNumber()
  usedId: number;

  @IsBoolean()
  isActive?: boolean;
}
