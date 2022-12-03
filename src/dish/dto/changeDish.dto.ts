import { IsArray, IsNumber, IsString } from 'class-validator';

export class changeDishDto {
  @IsString()
  dishName: string;

  @IsArray()
  photoDish: string[];

  @IsString()
  cookingVideo: string;

  description?: string;

  @IsString()
  author: string;

  @IsString()
  category: string;

  @IsString()
  kitchen: string;

  @IsArray()
  ingredients: string[];

  @IsNumber()
  timeForPreparing: number;
}
