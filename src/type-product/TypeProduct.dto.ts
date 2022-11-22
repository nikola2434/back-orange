import { IsString } from 'class-validator';

export class TypeProductDto {
  @IsString()
  title: string;

  icon?: string;
  description?: string;
  ingredients?: string[];
}
