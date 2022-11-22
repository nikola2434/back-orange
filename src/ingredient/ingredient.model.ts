import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { TypeProductModel } from 'src/type-product/TypeProduct.model';

export class IngredientModel extends TimeStamps {
  @prop({ default: '/uploads/ingredient/grocery (3).png' })
  icon: string;

  @prop({ required: true })
  title: string;

  @prop({ ref: () => TypeProductModel, type: () => String })
  type: Ref<TypeProductModel, string>;

  @prop({ default: 0 })
  calories: number;

  @prop({ default: 0 })
  protein: number;

  @prop({ default: 0 })
  fat: number;

  @prop({ default: 0 })
  carbohydrates: number;
}
