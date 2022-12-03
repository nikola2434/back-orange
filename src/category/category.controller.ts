import { CategoryUpdateDto } from './category.dto';
import { CategoryService } from './category.service';
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

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get('byId/:id')
  async getById(@Param('id') id: Types.ObjectId) {
    return await this.CategoryService.getById(id);
  }

  @Get('getAll')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return await this.CategoryService.getAll(searchTerm);
  }

  @Post('create')
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return await this.CategoryService.createCategory();
  }

  @Put('update/:id')
  @HttpCode(200)
  @Auth('admin')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() dto: CategoryUpdateDto,
  ) {
    return await this.CategoryService.updateCategory(id, dto);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: Types.ObjectId){
    return await this.CategoryService.deleteCategory(id)
  };
}
