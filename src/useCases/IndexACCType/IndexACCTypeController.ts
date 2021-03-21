import { Request, Response } from 'express';
import { IndexACCTypeUseCase } from './IndexACCTypeUseCase';

export class IndexACCTypeController {
  private indexACCTypeUseCase;

  constructor(indexACCTypeUseCase: IndexACCTypeUseCase) {
    this.indexACCTypeUseCase = indexACCTypeUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { sortField, sortOrder, nome, limit, page } = request.query;

    try {
      const accTypes = await this.indexACCTypeUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        nome: <string>nome,
        limit: Number(<string>limit),
        page: Number(<string>page),
      });
      response.status(200).json(accTypes);
    } catch (err) {
      console.error(err);
      response.sendStatus(400);
    }
  }
}
