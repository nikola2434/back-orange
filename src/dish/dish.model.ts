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

  @prop()
  cookingSteps: ICookingSteps[];

  @prop({ default: 0 })
  timeForPreparing: number;

  @prop()
  characteristics: ICharacteristicsDish;

  @prop()
  advice: string;

  @prop({ ref: () => UserModel })
  author: Ref<UserModel>;

  @prop()
  category: string;

  @prop()
  kitchen: string;

  @prop()
  ingredients: string[];

  @prop({ default: 0 })
  countLike: number;

  @prop({ default: 0 })
  countDislike: number;
}
