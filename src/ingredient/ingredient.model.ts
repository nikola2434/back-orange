import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class IngredientModel extends TimeStamps {
  @prop()
  icon: string;
}
