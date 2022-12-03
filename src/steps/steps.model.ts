import { DishModel } from './../dish/dish.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';


export interface StepsModel extends Base {}

export class StepsModel extends TimeStamps {
  @prop({ required: true })
  image: string;

  @prop({ ref: () => DishModel })
  idDish: Ref<DishModel>;

  @prop()
  description: string;

  @prop({ default: 0 })
  number: number;
}
