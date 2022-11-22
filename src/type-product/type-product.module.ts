import { TypeProductModel } from 'src/type-product/TypeProduct.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { TypeProductController } from './type-product.controller';
import { TypeProductService } from './type-product.service';

@Module({
  controllers: [TypeProductController],
  providers: [TypeProductService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TypeProductModel,
        schemaOptions: { collection: 'TypeProduct' },
      },
    ]),
  ],
  exports: [TypeProductService],
})
export class TypeProductModule {}
