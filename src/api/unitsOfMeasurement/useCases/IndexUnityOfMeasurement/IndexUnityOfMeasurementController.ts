import { Request, Response } from 'express';
import { IndexUnityOfMeasurementUseCase } from './IndexUnityOfMeasurementUseCase';

export class IndexUnityOfMeasurementController {
  private indexOfMeasurementUseCase;

  constructor(indexOfMeasurementUseCase: IndexUnityOfMeasurementUseCase) {
    this.indexOfMeasurementUseCase = indexOfMeasurementUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { sortField, sortOrder, name, page, limit } = request.query;

    try {
      const unitsOfMeasurement = await this.indexOfMeasurementUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        name: <string>name,
        page: Number(<string>page),
        limit: Number(<string>limit),
      });
      response.status(200).json(unitsOfMeasurement);
    } catch (err: any) {
      response.sendStatus(400);
    }
  }
}
