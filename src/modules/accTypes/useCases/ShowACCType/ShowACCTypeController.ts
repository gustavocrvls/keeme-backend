import { Request, Response } from 'express';
import { ShowACCTypeUseCase } from './ShowACCTypeUseCase';

export class ShowACCTypeController {
  private showACCTypeUseCase;

  constructor(showACCTypeUseCase: ShowACCTypeUseCase) {
    this.showACCTypeUseCase = showACCTypeUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const accTypes = await this.showACCTypeUseCase.execute({
        id: Number(<string>id),
      });
      response.status(200).json(accTypes);
    } catch (err) {
      console.error(err);
      response.status(404).json({ msg: 'Tipo de ACC não encontrado!' });
    }
  }
}
