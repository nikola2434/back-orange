import { FluentFfmpegModule } from '@mrkwskiti/fluent-ffmpeg-nestjs';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    FluentFfmpegModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
})
export class FileModule {}
