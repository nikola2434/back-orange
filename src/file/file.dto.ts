import { IsNumber, IsString } from 'class-validator';

export class videoToImageDto {
  @IsNumber()
  time: string;

  @IsString()
  source: string;

  @IsString()
  name: string;

  @IsString()
  folder: string;
}
