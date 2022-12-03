import { IngredientService } from './ingredient.service';
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
import { updateIngredientDto } from './dto/updateIngredientdto.';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly IngredientService: IngredientService) {}

  @Get('getAll')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return await this.IngredientService.getAllIngredients(searchTerm);
  }

  @Get('byId/:id')
  async getById(@Param('id') id: Types.ObjectId) {
    return await this.IngredientService.getById(id);
  }

  @Put('update/:id')
  @Auth('admin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() dto: updateIngredientDto,
  ) {
    return await this.IngredientService.update(id, dto);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Query('id') id: Types.ObjectId) {
    return await this.IngredientService.delete(id);
  }

  @Get('byType/:id')
  async getByType(@Query('id') id: Types.ObjectId) {
    return await this.IngredientService.getByType(id);
  }

  @Post('create')
  @Auth('admin')
  @HttpCode(200)
  async createIngredient() {
    return await this.IngredientService.createIngredient();
  }
}
