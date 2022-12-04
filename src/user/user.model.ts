import { DishModel } from './../dish/dish.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true, minlength: 5 })
  password: string;

  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true, default: false })
  role: boolean;

  @prop({ default: [], ref: () => DishModel })
  favoriteRecipes: Ref<DishModel>[];

  @prop()
  avatar: string;

  @prop({ default: [] })
  chosenRecipe: string[];

  @prop({ default: [] })
  yourRecipes: string[];

  @prop({ default: false })
  isActive: boolean;

  @prop({ default: [], ref: () => DishModel })
  dislikeRecipe: Ref<DishModel>[];
}
