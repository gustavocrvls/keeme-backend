import { Request, Response } from 'express';
import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserControler {
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(deleteUserUseCase: DeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    try {
      await this.deleteUserUseCase.execute({ id: Number(id) });
      response.sendStatus(200);
    } catch (err: any) {
      response.status(400).json({ msg: err.message });
    }
  }
}
