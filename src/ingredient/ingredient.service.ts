import { TypeProductService } from './../type-product/type-product.service';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IngredientModel } from './ingredient.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { updateIngredientDto } from './dto/updateIngredientdto.';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(IngredientModel)
    private readonly IngredientModel: ModelType<IngredientModel>,
    private readonly TypeProductService: TypeProductService,
  ) {}

  async getAllIngredients(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [{ title: new RegExp(searchTerm, 'i') }],
      };
    }

    return await this.IngredientModel.find(options).sort({ createdAt: 'desc' });
  }

  async getById(id: Types.ObjectId) {
    return await this.IngredientModel.findById(id).exec();
  }

  async update(id: Types.ObjectId, dto: updateIngredientDto) {
    if (dto.type) await this.TypeProductService.addIngredient(id, dto.type)
      return await this.IngredientModel.findByIdAndUpdate(id, dto, {
        new: true,
      }).exec();
  }

  async delete(id: Types.ObjectId) {
    return await this.IngredientModel.findByIdAndDelete(id).exec();
  }

  async getByType(idType: Types.ObjectId) {
    return await this.IngredientModel.find({ type: idType }).exec();
  }

  async createIngredient() {
    const ingredient: updateIngredientDto = {
      title: ' ',
      type: '',
    };
    const newIngredient = await this.IngredientModel.create(ingredient);
    return newIngredient._id;
  }
}
