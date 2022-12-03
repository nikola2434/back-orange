import { IngredientService } from './../ingredient/ingredient.service';
import { ICharacteristicsDish } from './dish.interface';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { DishModel } from './dish.model';
import { changeDishDto } from './dto/changeDish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(DishModel) private readonly DishModel: ModelType<DishModel>,
    private readonly IngredientService: IngredientService,
  ) {}

  async addStep(idDish: Types.ObjectId, idStep: Types.ObjectId) {
    return await this.DishModel.findByIdAndUpdate(
      idDish,
      {
        $push: { cookingSteps: idStep },
      },
      { new: true },
    );
  }

  async removeStep(idDish: Types.ObjectId, idStep: Types.ObjectId) {
    return await this.DishModel.findByIdAndUpdate(
      idDish,
      {
        $pull: { cookingSteps: idStep },
      },
      { new: true },
    );
  }

  async getAllDish(searchTerm?: string) {
    let options;
    if (searchTerm) {
      options = {
        $or: [
          {
            dishName: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    }
    return await this.DishModel.find(options)
      .sort({ createdAt: 'desc' })
      .select('-cookingVideo -description -cookingSteps')
      .exec();
  }

  async getById(id: Types.ObjectId) {
    return await this.DishModel.findByIdAndUpdate(
      id,
      {
        $inc: { countOpen: 1 },
      },
      { new: true },
    ).exec();
  }
  async getPopular() {
    return await this.DishModel.find().sort({ countOpen: 'desc' }).exec();
  }

  async createDish() {
    const createDish = {
      dishName: ' ',
      photoDish: '/uploads/dish/dish.png',
      cookingVideo: '',
      description: '',
      cookingSteps: [],
      characteristics: { calories: 0, squirrels: 0, fats: 0, carbohydrates: 0 },
      author: ' ',
      category: ' ',
      kitchen: ' ',
      ingredients: [],
    };
    return await (
      await this.DishModel.create(createDish)
    )._id;
  }

  async updateDish(id: Types.ObjectId, dto: changeDishDto) {
    const characteristics: ICharacteristicsDish =
      await this.IngredientService.measurement(dto.ingredients);
    return await this.DishModel.findById(
      id,
      { ...dto, characteristics },
      { new: true },
    ).exec();
  }

  async deleteDish(id: Types.ObjectId) {
    return await this.DishModel.findByIdAndDelete(id).exec();
  }
}
