import { Module } from '@nestjs/common';
import { TypeProductController } from './type-product.controller';
import { TypeProductService } from './type-product.service';

@Module({
  controllers: [TypeProductController],
  providers: [TypeProductService]
})
export class TypeProductModule {}
