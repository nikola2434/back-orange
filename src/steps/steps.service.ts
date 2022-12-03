import { StepsModel } from './steps.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { createStepsDto, updateStepDto } from './steps.dto';

@Injectable()
export class StepsService {
  constructor(
    @InjectModel(StepsModel) private readonly StepsModel: ModelType<StepsModel>,
  ) {}

  async getStepsById(id: Types.ObjectId) {
    return await this.StepsModel.find({ idDish: id })
      .sort({ number: 'desc' })
      .exec();
  }

  async createStep(idDish: Types.ObjectId) {
    const countSteps = await this.StepsModel.find({ idDish }).count();

    const newStep = {
      description: '',
      image: '/uploads/steps/cooking.png',
      idDish,
      number: countSteps + 1,
    };
    return await (
      await this.StepsModel.create(newStep)
    )._id;
  }

  async updateStep(idStep: Types.ObjectId, dto: updateStepDto) {
    return await this.StepsModel.findByIdAndUpdate(idStep, dto, {
      new: true,
    }).exec();
  }

  async createStepTheMiddle(idDish: Types.ObjectId, step: number) {
    this.StepsModel.find(idDish)
      .gt('number', step)
      .update({ $inc: { number: 1 } });

    const newStep = {
      description: '',
      image: '/uploads/steps/cooking.png',
      idDish,
      number: step,
    };
    return await (
      await this.StepsModel.create(newStep)
    )._id;
  }

  async deleteStep(id: Types.ObjectId) {
    const deleteStep = await this.StepsModel.findByIdAndDelete(id);
    this.StepsModel.find(deleteStep.idDish)
      .gt('number', deleteStep.number)
      .update({ $inc: { number: -1 } });

    return deleteStep;
  }
}
