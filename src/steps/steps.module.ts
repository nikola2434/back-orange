import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';
import { StepsModel } from './steps.model';

@Module({
  controllers: [StepsController],
  providers: [StepsService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: StepsModel,
        schemaOptions: { collection: 'Steps' },
      },
    ]),
  ],
})
export class StepsModule {}
