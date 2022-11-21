import { JwtGuard } from './guards/jwt.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { OnlyAdminGuard } from './guards/admin.guard';
import { activeMailGuard } from './guards/mail.guard';

export const Auth = (role: 'admin' | 'user' | undefined) => {
  return applyDecorators(
    role === 'admin'
      ? UseGuards(JwtGuard, activeMailGuard, OnlyAdminGuard)
      : UseGuards(JwtGuard, activeMailGuard),
  );
};
