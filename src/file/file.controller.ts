import { FileService } from './file.service';
import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/auth/Auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Post('/:folder')
  @HttpCode(200)
  @Auth('user')
  @UseInterceptors(FileInterceptor('files'))
  async fileUpload(
    @UploadedFile() files: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return await this.FileService.uploadFile([files], folder);
  }
}
