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
      nome,
      limit,
      page,
      unidade_de_medida,
    } = request.query;
    console.log(nome, limit);

    try {
      const accTypes = await this.indexACCTypeUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        nome: <string>nome,
        unidade_de_medida: Number(<string>unidade_de_medida),
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
