import { Request, Response } from 'express';
import { ACCType } from '../../../../entities/ACCType';
import { IUpdateACCTypeRequestDTO } from './UpdateACCTypeDTO';
import { UpdateACCTypeUseCase } from './UpdateACCTypeUseCase';

export class UpdateACCTypeController {
  private updateACCTypeUseCase;

  constructor(updateACCTypeUseCase: UpdateACCTypeUseCase) {
    this.updateACCTypeUseCase = updateACCTypeUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const {
      name,
      point_limit,
      description,
      unity_of_measurement,
      acc_variants,
    } = request.body;
    const { id } = request.params;

    const data = {} as IUpdateACCTypeRequestDTO;

    data.id = Number(id);
    if (point_limit) data.point_limit = point_limit;
    if (name) data.name = name;
    if (description) data.description = description;
    if (unity_of_measurement) data.unity_of_measurement = unity_of_measurement;
    if (acc_variants) data.acc_variants = acc_variants;

    try {
      this.updateACCTypeUseCase.execute(data);
      response.sendStatus(200);
    } catch (err) {
      console.error(err);
      response.sendStatus(500);
    }
  }
}
