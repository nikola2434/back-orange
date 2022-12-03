import { CategoryUpdateDto } from './category.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CategoryModel } from './Category.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly CategoryModel: ModelType<CategoryModel>,
  ) {}

  async getById(id: Types.ObjectId) {
    return await this.CategoryModel.findById(id).exec();
  }

  async getAll(searchTerm?: string) {
    let options;
    if (searchTerm) {
      options = {
        $or: [{ title: new RegExp(searchTerm, 'i') }],
      };
    }
    return await this.CategoryModel.find(options).exec();
  }

  async createCategory() {
    const newCategory: CategoryUpdateDto = {
      title: ' ',
      description: '',
      dish: [],
    };

    return await (
      await this.CategoryModel.create(newCategory)
    )._id;
  }

  async updateCategory(id: Types.ObjectId, dto: CategoryUpdateDto) {
    return await this.CategoryModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
  }

  async deleteCategory(id: Types.ObjectId) {
    return await this.CategoryModel.findByIdAndDelete(id).exec();
  }
}
