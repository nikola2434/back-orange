import { changeDishDto } from './dto/changeDish.dto';
import { DishService } from './dish.service';
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
import { Types } from 'mongoose';
import { Auth } from 'src/auth/Auth.decorator';

@Controller('dish')
export class DishController {
  constructor(private readonly DishService: DishService) {}

  @Get('allDish')
  async getAllDish(@Query('searchTerm') searchTerm?: string) {
    return await this.DishService.getAllDish(searchTerm);
  }

  @Get('popular')
  async getPopular() {
    return await this.DishService.getPopular();
  }

  @Get('byId/:id')
  async getById(@Param('id') id: Types.ObjectId) {
    return await this.DishService.getById(id);
  }

  @Post('create')
  @Auth('admin')
  @HttpCode(200)
  async createDish() {
    return await this.DishService.createDish();
  }

  @Put('update/id')
  @Auth('admin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateDish(
    @Param('id') id: Types.ObjectId,
    @Body() dto: changeDishDto,
  ) {
    return await this.DishService.updateDish(id, dto);
  }

  @Delete('/:id')
  @Auth('admin')
  async delete(@Param('id') id: Types.ObjectId) {
    return await this.DishService.deleteDish(id);
  }
}
