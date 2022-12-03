import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class createStepsDto {
  @IsString()
  image: string;

  @IsString()
  description: string;
}

export class updateStepDto {
  image?: string;
  description?: string;
}

export class createTheMiddleDto {
  idDish: Types.ObjectId;
  @IsNumber()
  step: number;
}

export class deleteStepDto {
  id: Types.ObjectId;
  idDish: Types.ObjectId;
}
