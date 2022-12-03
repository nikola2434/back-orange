import { IsString } from 'class-validator';

export class KitchenUpdateDto {
  @IsString()
  title: string;

  description?: string;

  dish?: string[];
}
