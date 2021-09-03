import { Request, Response } from 'express';
import { IndexACCTypeWithUserPointsUseCase } from './IndexACCTypeWithUserPointsUseCase';

export class IndexACCTypeWithUserPointsController {
  private indexACCTypeWithUserPoints;

  constructor(indexACCTypeWithUserPoints: IndexACCTypeWithUserPointsUseCase) {
    this.indexACCTypeWithUserPoints = indexACCTypeWithUserPoints;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { user_id } = request.params;
    const { name, sortField, sortOrder, page, limit } = request.query;

    try {
      const accTypesWithUserPoints = await this.indexACCTypeWithUserPoints.execute(
        {
          user_id: Number(<string>user_id),
          name: name as string,
          sortField: sortField as string,
          sortOrder: sortOrder as 'ASC' | 'DESC',
          page: Number(page as string),
          limit: Number(limit as string),
        },
      );
      response.status(200).json(accTypesWithUserPoints);
    } catch (err: any) {
      console.error(err);
      response.sendStatus(400);
    }
  }
}
