import { KitchenUpdateDto } from './kitchen.dto';
import { Types } from 'mongoose';
import { KitchenService } from './kitchen.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/Auth.decorator';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly KitchenService: KitchenService) {}

  @Get('byId/:id')
  async getById(@Param('id') id: Types.ObjectId) {
    return await this.KitchenService.getById(id);
  }

  @Get('getAll')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return await this.KitchenService.getAll(searchTerm);
  }

  @Post('create')
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return await this.KitchenService.createKitchen();
  }

  @Put('update/:id')
  @HttpCode(200)
  @Auth('admin')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: Types.ObjectId, @Body() dto: KitchenUpdateDto) {
    return await this.KitchenService.updateKitchen(id, dto);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: Types.ObjectId) {
    return await this.KitchenService.deleteKitchen(id);
  }
}
