import { Request, Response } from 'express';
import { IndexUserUseCase } from './IndexUserUseCase';

export class IndexUserController {
  private indexUserUseCase;

  constructor(indexUserUseCase: IndexUserUseCase) {
    this.indexUserUseCase = indexUserUseCase;
  }

  public async handle(request: Request, response: Response): Promise<void> {
    const {
      sortField,
      sortOrder,
      limit,
      page,
      search,
      course,
      profile,
    } = request.query;

    try {
      const users = await this.indexUserUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        limit: Number(<string>limit),
        page: Number(<string>page),
        search: <string>search,
        course: Number(<string>course),
        profile: Number(<string>profile),
      });
      response.status(200).json(users);
    } catch (err) {
      console.error(err);
      response.sendStatus(400);
    }
  }
}
