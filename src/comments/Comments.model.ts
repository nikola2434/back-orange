import { DishModel } from 'src/dish/dish.model';
import { UserModel } from './../user/user.model';

import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface CommentModel extends Base {}

export class CommentModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  author: Ref<UserModel>;

  @prop({ ref: () => DishModel })
  idDish: Ref<DishModel>;

  @prop({ required: true })
  text: string;
}
