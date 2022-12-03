import { path } from 'app-root-path';
import { IResponseFile } from './file.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ensureDir, writeFile } from 'fs-extra';
import { InjectFluentFfmpeg, Ffmpeg } from '@mrkwskiti/fluent-ffmpeg-nestjs';
import { videoToImageDto } from './file.dto';

@Injectable()
export class FileService {
  constructor(@InjectFluentFfmpeg() private readonly ffmpeg: Ffmpeg) {}

  async uploadFile(
    files: Express.Multer.File[],
    folder = 'default',
  ): Promise<IResponseFile[]> {
    const uploadFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadFolder);

    const res: IResponseFile[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
        return {
          url: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        };
      }),
    );

    return res;
  }

  async videoToPicture({ folder, name, source, time }: videoToImageDto) {
    this.ffmpeg(`${path}${source}`).takeScreenshots(
      {
        timemarks: [time],
        filename: name,
      },
      `${path}/uploads/steps/${folder}`,
    );

    return { url: `/uploads/steps/${folder}/${name}`, name: name };
  }
}
