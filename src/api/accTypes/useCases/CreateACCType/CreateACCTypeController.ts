import { Request, Response } from 'express';
import { ACCType } from '../../../../entities/ACCType';
import { CreateACCTypeUseCase } from './CreateACCTypeUseCase';

export class CreateACCTypeController {
  private createACCTypeUseCase;

  constructor(createACCTypeUseCase: CreateACCTypeUseCase) {
    this.createACCTypeUseCase = createACCTypeUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const {
      name,
      point_limit,
      description,
      unity_of_measurement,
      acc_variants,
    } = request.body;

    const accType = new ACCType({
      name,
      point_limit,
      description,
      unity_of_measurement,
      acc_variants,
    });

    try {
      this.createACCTypeUseCase.execute(accType);
      response.sendStatus(201);
    } catch (err: any) {
      console.error(err);
      response.sendStatus(500);
    }
  }
}
