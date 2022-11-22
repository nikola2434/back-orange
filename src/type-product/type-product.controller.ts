import { TypeProductDto } from './TypeProduct.dto';
import { TypeProductService } from './type-product.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/Auth.decorator';
import { Types } from 'mongoose';

@Controller('type-product')
export class TypeProductController {
  constructor(private readonly TypeProductService: TypeProductService) {}

  @Get('getAll')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return await this.TypeProductService.getAll(searchTerm);
  }

  @Post('create')
  @HttpCode(200)
  @Auth('admin')
  async createType() {
    return await this.TypeProductService.create();
  }

  @Post('update/:id')
  @Auth('admin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateType(
    @Param('id') id: Types.ObjectId,
    @Body() dto: TypeProductDto,
  ) {
    return await this.TypeProductService.updateType(id, dto);
  }

  @Delete(':id')
  @Auth('admin')
  async deleteType(@Param('id') id: Types.ObjectId) {
    return await this.TypeProductService.deleteType(id);
  }

  @Get('byId/:id')
  async byIdType(@Param('id') id: Types.ObjectId) {
    return await this.TypeProductService.byIdType(id);
  }
}
