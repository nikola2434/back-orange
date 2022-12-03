import { IsString } from 'class-validator';

export class updateCommentDto {
  @IsString()
  text: string;
}
