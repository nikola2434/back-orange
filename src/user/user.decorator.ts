import { UserModel } from './user.model';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof UserModel, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserModel }>();
    const user = request.user;

    return data ? user[data] : user;
  },
);
