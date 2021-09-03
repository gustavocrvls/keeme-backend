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
      name,
      user,
      acc_type,
      acc_status,
      course,
    } = request.query;

    try {
      const accs = await this.indexACCUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        limit: Number(<string>limit),
        page: Number(<string>page),
        name: <string>name,
        user: Number(<string>user),
        acc_type: Number(<string>acc_type),
        acc_status: Number(<string>acc_status),
        course: Number(<string>course),
      });
      response.status(200).json(accs);
    } catch (err: any) {
      console.error(err);
      response.sendStatus(400);
    }
  }
}
