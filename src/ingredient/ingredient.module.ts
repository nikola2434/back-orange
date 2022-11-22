import { TypeProductModule } from './../type-product/type-product.module';

import { IngredientModel } from './ingredient.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService],
  imports: [
    TypeProductModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: IngredientModel,
        schemaOptions: { collection: 'Ingredient' },
      },
    ]),
  ],
})
export class IngredientModule {}
