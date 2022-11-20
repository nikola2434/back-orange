import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  transport: {
    host: configService.get('SMTP_HOST'),
    port: configService.get('SMTP_PORT'),
    secure: true,
    service: 'gmail',
    auth: {
      user: configService.get('SMTP_USER'),
      pass: configService.get('SMTP_PASSWORD'),
    },
    tls: {
      ciphers: 'SSLv3',
    },
  },
});
