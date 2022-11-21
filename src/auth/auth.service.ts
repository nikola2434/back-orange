import { jwtTokenDto } from './dto/jwtToken.dto';
import { Types } from 'mongoose';
import {
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from './../user/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { loginDto, registerDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private readonly JwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(dto: loginDto) {
    const user = await this.UserModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const isValidPassport = await compare(dto.password, user.password);

    if (!isValidPassport) throw new UnauthorizedException('Не верен пароль');

    const tokens = await this.issueTokens(user._id);

    return {
      user,
      ...tokens,
    };
  }

  async register(dto: registerDto) {
    const oldUser = await this.UserModel.findOne({ email: dto.email });
    if (oldUser)
      throw new BadRequestException('Такой email уже зарегистрирован');
    const oldNameUser = await this.UserModel.findOne({ name: dto.name });
    if (oldNameUser) throw new BadRequestException('Такое имя уже существует');

    const salt = await genSalt(10);
    const user = new this.UserModel({
      email: dto.email,
      password: await hash(dto.password, salt),
      name: dto.name,
    });
    const newUser = await user.save();
    const tokens = await this.issueTokens(newUser._id);

    this.sendMail(newUser.email, newUser._id);
    return {
      user: newUser,
      ...tokens,
    };
  }

  async issueTokens(_id: Types.ObjectId) {
    const data = { _id };
    const refreshToken = await this.JwtService.signAsync(data, {
      expiresIn: '14d',
    });

    const accessToken = await this.JwtService.signAsync(data, {
      expiresIn: '1h',
    });
    return { refreshToken, accessToken };
  }

  async getNewTokens({ refreshToken }: jwtTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Не верен токен');

    const result = await this.JwtService.verifyAsync(refreshToken);
    const tokens = await this.issueTokens(result._id);

    const user = await this.UserModel.findById(result._id);

    return {
      user,
      ...tokens,
    };
  }

  async sendMail(email: string, id: Types.ObjectId) {
    return await this.mailerService.sendMail({
      to: email,
      subject: 'Подтверждение регистрации',
      html: `<div><h1>Подтверждение аккаунта</h1>
      <div>Перейдите по ссылке:</div>
      <div><a href="http://localhost:4200/Api/auth/confirmation/${id}">http://localhost:4200/Api/auth/confirmation/${id}</a></div> </div>`,
    });
  }

  async confirmationUser(id: Types.ObjectId) {
    return await this.UserModel.findByIdAndUpdate(id, { isActive: true });
  }
}
