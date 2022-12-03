import { KitchenModel } from './kitchen.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';

@Module({
  controllers: [KitchenController],
  providers: [KitchenService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: KitchenModel,
        schemaOptions: { collection: 'Kitchen' },
      },
    ]),
  ],
})
export class KitchenModule {}
