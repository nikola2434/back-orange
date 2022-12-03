import { CategoryModel } from './../category/Category.model';
import { StepsModel } from './../steps/steps.model';
import { UserModel } from './../user/user.model';
import { ICookingSteps, ICharacteristicsDish } from './dish.interface';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

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
  cookingSteps: Ref<StepsModel>;

  @prop({ default: 0 })
  timeForPreparing: number;

  @prop()
  characteristics: ICharacteristicsDish;

  @prop({ ref: () => UserModel })
  author: Ref<UserModel>;

  @prop({ ref: () => CategoryModel })
  category: Ref<CategoryModel>;

  @prop()
  kitchen: string;

  @prop()
  ingredients: string[];

  @prop({ default: 0 })
  countLike: number;

  @prop({ default: 0 })
  countDislike: number;
}
