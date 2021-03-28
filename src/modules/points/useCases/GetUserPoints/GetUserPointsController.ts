import { Request, Response } from 'express';
import { GetUserPointsUseCase } from './GetUserPointsUseCase';

export class GetUserPointsController {
  private getUserPointsUseCase;

  constructor(getUserPointsUseCase: GetUserPointsUseCase) {
    this.getUserPointsUseCase = getUserPointsUseCase;
  }

  public async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const summary = await this.getUserPointsUseCase.execute({
      id: Number(<string>id),
    });
    response.send(summary);
  }
}
