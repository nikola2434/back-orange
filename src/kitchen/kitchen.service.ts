import { KitchenUpdateDto } from './kitchen.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { KitchenModel } from './kitchen.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class KitchenService {
  constructor(
    @InjectModel(KitchenModel)
    private readonly KitchenModel: ModelType<KitchenModel>,
  ) {}

  async getAll(searchTerm?: string) {
    let options;
    if (options) {
      options = {
        $or: [{ title: new RegExp(searchTerm, 'i') }],
      };
    }
    return await this.KitchenModel.find(options).exec();
  }

  async getById(id: Types.ObjectId) {
    return await this.KitchenModel.findById(id).exec();
  }

  async createKitchen() {
    const newKitchen: KitchenUpdateDto = {
      title: ' ',
      description: '',
      dish: [],
    };

    return await (
      await this.KitchenModel.create(newKitchen)
    )._id;
  }

  async updateKitchen(id: Types.ObjectId, dto: KitchenUpdateDto) {
    return await this.KitchenModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
  }

  async deleteKitchen(id: Types.ObjectId) {
    return await this.KitchenModel.findByIdAndDelete(id).exec();
  }
}
