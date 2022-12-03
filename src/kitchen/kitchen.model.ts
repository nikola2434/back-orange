import { DishModel } from 'src/dish/dish.model';

import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface KitchenModel extends Base {}

export class KitchenModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop()
  description: string;

  @prop({ ref: () => DishModel })
  dish: Ref<DishModel[]>;
}
