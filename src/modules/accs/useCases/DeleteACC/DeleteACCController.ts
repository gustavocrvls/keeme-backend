import { Request, Response } from 'express';
import { DeleteACCUseCase } from './DeleteACCUseCase';

export class DeleteACCController {
  private deleteACCUseCase;

  constructor(deleteACCUseCase: DeleteACCUseCase) {
    this.deleteACCUseCase = deleteACCUseCase;
  }

  public async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await this.deleteACCUseCase.execute({
        id: Number(<string>id),
      });
      response.sendStatus(200);
    } catch (err: any) {
      response.status(400).json({ msg: err.message });
    }
  }
}
