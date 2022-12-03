import { DishModel } from './../../dist/dish/dish.model.d';
import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface CategoryModel extends Base {}

export class CategoryModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop()
  description: string;

  @prop({ ref: () => DishModel })
  dish: Ref<DishModel[]>;
}
