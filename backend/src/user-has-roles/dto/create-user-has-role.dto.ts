import { IsNumber, IsString } from 'class-validator';

export class CreateUserHasRoleDto {
  @IsNumber()
  roleId: number;

  @IsNumber()
  userId: number;

  isActive?: boolean;

  @IsString()
  contactNumber?: string;

  @IsString()
  businessType?: string;

  @IsString()
  businessName?: string;
}
