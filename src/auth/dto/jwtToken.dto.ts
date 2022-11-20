import { IsString } from 'class-validator';

export class jwtTokenDto {
  @IsString()
  refreshToken: string;
}
