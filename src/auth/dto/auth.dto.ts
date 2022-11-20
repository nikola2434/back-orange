import { IsEmail, IsString, MinLength } from 'class-validator';

export class loginDto {
  @IsEmail()
  email: string;

  @MinLength(5, { message: 'Пароль должен быть не менее 5 символов!' })
  password: string;
}

export class registerDto {
  @IsEmail()
  email: string;

  @MinLength(5, { message: 'Пароль должен быть не менее 5 символов!' })
  password: string;

  @IsString()
  name: string;
}
