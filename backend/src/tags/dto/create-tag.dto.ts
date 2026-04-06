import { IsBoolean, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsBoolean()
  isActive?: boolean;
}
