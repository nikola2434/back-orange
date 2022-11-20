import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('Api');
  app.enableCors();
  await app.listen(4200);
}
bootstrap();
