import { ICookingSteps } from '../dish.interface';

export class changeDishDto {
  dishName?: string;
  photoDish: string[];
  cookingVideo: string;
  description: string;
  cookingSteps: ICookingSteps[];
  advice: string;
}
