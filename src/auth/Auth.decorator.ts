import { JwtAuthGuard } from './guards/jwt.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { OnlyAdminGuard } from './guards/admin.guard';
import { activeMailGuard } from './guards/mail.guard';

export const Auth = (role: 'admin' | 'user' | undefined) => {
  applyDecorators(
    role === 'admin'
      ? UseGuards(OnlyAdminGuard, JwtAuthGuard, activeMailGuard)
      : UseGuards(JwtAuthGuard, activeMailGuard),
  );
};
