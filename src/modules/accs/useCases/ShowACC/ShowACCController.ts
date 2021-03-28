import { Request, Response } from 'express';
import { ShowACCUseCase } from './ShowACCUseCase';

export class ShowACCController {
  private showACCUseCase;

  constructor(showACCUseCase: ShowACCUseCase) {
    this.showACCUseCase = showACCUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const acc = await this.showACCUseCase.execute({
        id: Number(<string>id),
      });
      response.status(200).json(acc);
    } catch (err) {
      console.error(err);
      response.status(404).json({ msg: 'Tipo de ACC não encontrado!' });
    }
  }
}
