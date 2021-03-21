import { Request, Response } from 'express';
import { IndexUnityOfMeasurementUseCase } from './IndexUnityOfMeasurementUseCase';

export class IndexUnityOfMeasurementController {
  private indexOfMeasurementUseCase;

  constructor(indexOfMeasurementUseCase: IndexUnityOfMeasurementUseCase) {
    this.indexOfMeasurementUseCase = indexOfMeasurementUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { sortField, sortOrder, nome, page, limit } = request.query;

    try {
      const unitsOfMeasurement = await this.indexOfMeasurementUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        nome: <string>nome,
        page: Number(<string>page),
        limit: Number(<string>limit),
      });
      response.status(200).json(unitsOfMeasurement);
    } catch (err) {
      response.sendStatus(400);
    }
  }
}