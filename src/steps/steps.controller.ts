import { createTheMiddleDto, deleteStepDto, updateStepDto } from './steps.dto';
import { StepsService } from './steps.service';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/Auth.decorator';
import { Types } from 'mongoose';

@Controller('steps')
export class StepsController {
  constructor(private readonly StepsService: StepsService) {}

  @Post('create/:idDish')
  @Auth('admin')
  @HttpCode(200)
  async createStep(@Param('idDish') idDish: Types.ObjectId) {
    return await this.StepsService.createStep(idDish);
  }

  @Post('createTheMiddle')
  @Auth('admin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async createTheMiddle(@Body() dto: createTheMiddleDto) {
    return await this.StepsService.createStepTheMiddle(dto.idDish, dto.step);
  }

  @Put('update/:idStep')
  @Auth('admin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateStep(
    @Param('idStep') idStep: Types.ObjectId,
    @Body() dto: updateStepDto,
  ) {
    return await this.StepsService.updateStep(idStep, dto);
  }

  @Delete('delete')
  @Auth('admin')
  @UsePipes(new ValidationPipe())
  async deleteStep(@Body() dto: deleteStepDto) {
    return await this.StepsService.deleteStep(dto.id, dto.idDish);
  }
}
