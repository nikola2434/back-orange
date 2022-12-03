import { IsString } from 'class-validator';

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
