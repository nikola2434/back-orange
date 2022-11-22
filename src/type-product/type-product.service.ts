import { TypeProductDto } from './TypeProduct.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TypeProductModel } from 'src/type-product/TypeProduct.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class TypeProductService {
  constructor(
    @InjectModel(TypeProductModel)
    private readonly TypeProductModel: ModelType<TypeProductModel>,
  ) {}

  async addIngredient(idIngredient: Types.ObjectId, idTypeProduct: string) {
    return await this.TypeProductModel.findByIdAndUpdate(
      idTypeProduct,
      {
        $addToSet: { ingredients: [idIngredient] },
      },
      { new: true },
    );
  }

  async create() {
    const newTypeProducts: TypeProductDto = {
      title: ' ',
      description: '',
      ingredients: [],
    };
    const TypeProduct = await this.TypeProductModel.create(newTypeProducts);
    return TypeProduct._id;
  }

  async getAll(searchTerm?: string) {
    let options = {};
    if (searchTerm) {
      options = {
        $or: [{ title: new RegExp(searchTerm, 'i') }],
      };
    }
    return await this.TypeProductModel.find(options).exec();
  }

  async updateType(id: Types.ObjectId, dto: TypeProductDto) {
    return await this.TypeProductModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }

  async deleteType(id: Types.ObjectId) {
    return await this.TypeProductModel.findByIdAndDelete(id).exec();
  }

  async byIdType(id: Types.ObjectId) {
    return await this.TypeProductModel.findById(id).exec();
  }
}
