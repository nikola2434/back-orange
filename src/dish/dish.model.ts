import { IngredientModel } from './../ingredient/ingredient.model';
import { KitchenModel } from './../kitchen/kitchen.model';
import { CategoryModel } from './../category/Category.model';
import { StepsModel } from './../steps/steps.model';
import { UserModel } from './../user/user.model';

import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ICharacteristicsDish } from './dish.interface';

export interface DishModel extends Base {}

export class DishModel extends TimeStamps {
  @prop({ required: true })
  dishName: string;

  @prop({ required: true })
  photoDish: string[];

  @prop()
  cookingVideo: string;

  @prop()
  description: string;

  @prop({ ref: () => StepsModel })
  cookingSteps: Ref<StepsModel[]>;

  @prop({ default: 0 })
  timeForPreparing: number;

  @prop()
  characteristics: ICharacteristicsDish;

  @prop({ ref: () => UserModel, type: () => String })
  author: Ref<UserModel>;

  @prop({ ref: () => CategoryModel, type: () => String })
  category: Ref<CategoryModel>;

  @prop({ ref: () => KitchenModel, type: () => String })
  kitchen: Ref<KitchenModel>;

  @prop({ ref: () => IngredientModel })
  ingredients: Ref<IngredientModel[]>;

  @prop({ default: 0 })
  countOpen: number;

  @prop({ default: 0 })
  countLike: number;

  @prop({ default: 0 })
  countDislike: number;
}
