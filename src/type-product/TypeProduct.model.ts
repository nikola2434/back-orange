import { IngredientModel } from './../ingredient/ingredient.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface TypeProductModel extends Base {}

export class TypeProductModel extends TimeStamps {
  @prop({ default: '/uploads/typeIngredients/healthy-food.png' })
  icon: string;

  @prop({ required: true })
  title: string;

  @prop()
  description: string;

  @prop({ ref: () => IngredientModel })
  ingredients: Ref<IngredientModel>[];
}
