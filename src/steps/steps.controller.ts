import { StepsService } from './steps.service';
import { Controller } from '@nestjs/common';

@Controller('steps')
export class StepsController {
  constructor(private readonly StepsService: StepsService) {}

  
}
