import { IsString } from 'class-validator';

export class CategoryUpdateDto {
  @IsString()
  title: string;

  description?: string;

  dish?: string[];
}
