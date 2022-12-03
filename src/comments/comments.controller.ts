import { updateCommentDto } from './comments.dto';
import { CommentsService } from './comments.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/Auth.decorator';
import { User } from 'src/user/user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}

  @Get('byIdDish/:idDish')
  async getComments(@Param('idDish') idDish: Types.ObjectId) {
    return await this.CommentsService.getDyIdDish(idDish);
  }

  @Post('create/:idDish')
  @Auth('user')
  @HttpCode(200)
  async createComment(
    @Param('idDish') idDish: Types.ObjectId,
    @User('_id') _id: Types.ObjectId,
  ) {
    return await this.CommentsService.createComment(idDish, _id);
  }

  @Put('update/:id')
  @Auth('user')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateComment(
    @Param('id') id: Types.ObjectId,
    @Body() dto: updateCommentDto,
    @User('_id') _id: Types.ObjectId,
  ) {
    return await this.CommentsService.updateComment(id, _id, dto);
  }

  @Delete('/:id')
  @Auth('admin')
  async deleteComment(
    @User('_id') _id: Types.ObjectId,
    @Param('id') id: Types.ObjectId,
  ) {
    return await this.CommentsService.deleteComment(id, _id);
  }
}
