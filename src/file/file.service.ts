import { path } from 'app-root-path';
import { IResponseFile } from './file.interface';
import { Injectable } from '@nestjs/common';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {
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
}
