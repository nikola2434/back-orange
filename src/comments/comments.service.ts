import { updateCommentDto } from './comments.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CommentModel } from './Comments.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentModel)
    private readonly CommentModel: ModelType<CommentModel>,
  ) {}

  async getDyIdDish(idDish: Types.ObjectId) {
    return await this.CommentModel.find({ idDish }).sort({ createdAt: 'desc' });
  }

  async createComment(idDish: Types.ObjectId, idUser: Types.ObjectId) {
    const comment = {
      author: idUser,
      idDish,
      text: ' ',
    };
    return await (
      await this.CommentModel.create(comment)
    )._id;
  }

  async updateComment(
    idComment: Types.ObjectId,
    idUser: Types.ObjectId,
    dto: updateCommentDto,
  ) {
    const comment = await this.CommentModel.findById(idComment);
    if (comment.author !== idUser)
      throw new BadRequestException('Вы не являетесь создателем комментария!');
    return await this.CommentModel.findByIdAndUpdate(idComment, dto, {
      new: true,
    }).exec();
  }

  async deleteComment(idComment: Types.ObjectId, idUser: Types.ObjectId) {
    const comment = await this.CommentModel.findById(idComment);
    if (comment.author !== idUser)
      throw new BadRequestException('Вы не являетесь создателем комментария!');
    return await this.CommentModel.findByIdAndDelete(idComment).exec();
  }
}
