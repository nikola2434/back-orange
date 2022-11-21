import { ConfigService } from '@nestjs/config';
import { UserModel } from './../user/user.model';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private readonly ConfigService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: ConfigService.get('JWT_TOKEN'),
    });
  }

  async validate({ _id }: Pick<UserModel, '_id'>) {
    const user = await this.UserModel.findById(_id).exec();
    return user;
  }
}
