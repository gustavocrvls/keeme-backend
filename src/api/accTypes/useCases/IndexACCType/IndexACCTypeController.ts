import { Request, Response } from 'express';
import { IndexACCTypeUseCase } from './IndexACCTypeUseCase';

export class IndexACCTypeController {
  private indexACCTypeUseCase;

  constructor(indexACCTypeUseCase: IndexACCTypeUseCase) {
    this.indexACCTypeUseCase = indexACCTypeUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const {
      sortField,
      sortOrder,
      name,
      limit,
      page,
      unity_of_measurement,
    } = request.query;

    try {
      const accTypes = await this.indexACCTypeUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        name: <string>name,
        unity_of_measurement: Number(<string>unity_of_measurement),
        limit: Number(<string>limit),
        page: Number(<string>page),
      });
      response.status(200).json(accTypes);
    } catch (err: any) {
      console.error(err);
      response.sendStatus(400);
    }
  }
}
