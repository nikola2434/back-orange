import { IngredientModel } from './../ingredient/ingredient.model';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface TypeProductModel extends Base {}

export class TypeProductModel extends TimeStamps {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop({ ref: () => IngredientModel })
  ingredients: IngredientModel[];
}
