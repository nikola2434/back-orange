import { IngredientModule } from './../ingredient/ingredient.module';
import { DishModel } from './dish.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  controllers: [DishController],
  providers: [DishService],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: DishModel, schemaOptions: { collection: 'Dish' } },
    ]),
    IngredientModule,
  ],
  exports: [DishService],
})
export class DishModule {}
