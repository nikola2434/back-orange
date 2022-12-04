import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}

  async toggleFavorites(idDish: Types.ObjectId, user: UserModel) {
    const { _id, favoriteRecipes } = user;

    await this.UserModel.findByIdAndUpdate(_id, {
      favoriteRecipes: favoriteRecipes.includes(idDish)
        ? favoriteRecipes.filter((id) => id !== idDish)
        : [...favoriteRecipes, idDish],
    });
  }

  async toggleDislike(
    idDish: Types.ObjectId,
    { _id, dislikeRecipe }: UserModel,
  ) {
    await this.UserModel.findByIdAndUpdate(_id, {
      dislikeRecipe: dislikeRecipe.includes(idDish)
        ? dislikeRecipe.filter((id) => id !== idDish)
        : [...dislikeRecipe, idDish],
    });
  }

  async getFavoriteRecipe(id: Types.ObjectId) {
    return await this.UserModel.findById(id, 'favoriteRecipes')
      .populate('favoriteRecipes')
      .exec();
  }

  async getProfile(id: Types.ObjectId) {
    return await this.UserModel.findById(id).exec();
  }
}
