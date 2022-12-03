import { FileService } from './file.service';
import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/Auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { videoToImageDto } from './file.dto';

@Controller('file')
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Post('toImage')
  @HttpCode(200)
  @Auth('user')
  @UsePipes(new ValidationPipe())
  async videoToImage(@Body() dto: videoToImageDto) {
    return this.FileService.videoToPicture(dto);
  }

  @Post('upload')
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
