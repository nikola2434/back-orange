import { jwtTokenDto } from './dto/jwtToken.dto';
import { AuthService } from './auth.service';
import { loginDto, registerDto } from './dto/auth.dto';

import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() dto: loginDto) {
    return await this.AuthService.login(dto);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async register(@Body() dto: registerDto) {
    return await this.AuthService.register(dto);
  }

  @Post('getToken')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async getToken(@Body() dto: jwtTokenDto) {
    return await this.AuthService.getNewTokens(dto);
  }

  @Get('confirmation/:id')
  @HttpCode(200)
  async confirmationUser(
    @Param('id') id: Types.ObjectId,
    @Res() res: Response,
  ) {
    await this.AuthService.confirmationUser(id);
    return res.redirect('https://yandex.com/');
  }
}
