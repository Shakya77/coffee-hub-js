import { IsNumber, IsString } from 'class-validator';

export class CreateDiseaseDto {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  notes?: string;
}
