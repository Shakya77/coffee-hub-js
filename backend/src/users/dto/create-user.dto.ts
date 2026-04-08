import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  verifiedAt: Date;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  role: string;
}
