import { ModelType } from '@typegoose/typegoose/lib/types';
import { DishModel } from './../../dist/dish/dish.model.d';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(DishModel) private readonly DishModel: ModelType<DishModel>,
  ) {}

  
}
