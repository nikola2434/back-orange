import { getMongoConfig } from './config/mongo.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DishModule } from './dish/dish.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';
import { TypeProductModule } from './type-product/type-product.module';
import { StepsModule } from './steps/steps.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    UserModule,
    AuthModule,
    DishModule,
    IngredientModule,
    KitchenModule,
    CategoryModule,
    FileModule,
    TypeProductModule,
    StepsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
