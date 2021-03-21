import { Request, Response } from 'express';
import { IndexACCUseCase } from './IndexACCUseCase';

export class IndexACCController {
  private indexACCUseCase;

  constructor(indexACCUseCase: IndexACCUseCase) {
    this.indexACCUseCase = indexACCUseCase;
  }

  public async handle(request: Request, response: Response): Promise<void> {
    const {
      sortField,
      sortOrder,
      limit,
      page,
      nome,
      usuario,
      tipo_de_acc,
      status_da_acc,
    } = request.query;

    try {
      const accs = await this.indexACCUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        limit: Number(<string>limit),
        page: Number(<string>page),
        nome: <string>nome,
        usuario: Number(<string>usuario),
        tipo_de_acc: Number(<string>tipo_de_acc),
        status_da_acc: Number(<string>status_da_acc),
      });
      response.status(200).json(accs);
    } catch (err) {
      console.error(err);
      response.sendStatus(400);
    }
  }
}
