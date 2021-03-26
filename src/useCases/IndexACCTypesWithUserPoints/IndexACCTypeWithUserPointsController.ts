import { Request, Response } from 'express';
import { IndexACCTypeWithUserPointsUseCase } from './IndexACCTypeWithUserPointsUseCase';

export class IndexACCTypeWithUserPointsController {
  private indexACCTypeWithUserPoints;

  constructor(indexACCTypeWithUserPoints: IndexACCTypeWithUserPointsUseCase) {
    this.indexACCTypeWithUserPoints = indexACCTypeWithUserPoints;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { user_id } = request.params;

    try {
      const accTypesWithUserPoints = await this.indexACCTypeWithUserPoints.execute(
        {
          user_id: Number(<string>user_id),
        },
      );
      response.status(200).json(accTypesWithUserPoints);
    } catch (err) {
      console.error(err);
      response.sendStatus(400);
    }
  }
}
