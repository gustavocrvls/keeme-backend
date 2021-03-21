import { Request, Response } from 'express';
import { DeleteACCTypeUseCase } from './DeleteACCTypeUseCase';

export class DeleteACCTypeController {
  private deleteACCTypeUseCase;

  constructor(deleteACCTypeUseCase: DeleteACCTypeUseCase) {
    this.deleteACCTypeUseCase = deleteACCTypeUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await this.deleteACCTypeUseCase.execute({
        id: Number(<string>id),
      });
      response.sendStatus(200);
    } catch (err) {
      response
        .status(400)
        .json({ msg: 'Este Tipo de ACC possui ACCs associadas a ele.' });
    }
  }
}
