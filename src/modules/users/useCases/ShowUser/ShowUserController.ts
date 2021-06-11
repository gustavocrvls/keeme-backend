import { Request, Response } from 'express';
import { ShowUserUseCase } from './ShowUserUseCase';

export class ShowUserController {
  private showUserUseCase: ShowUserUseCase;

  constructor(showUserUseCase: ShowUserUseCase) {
    this.showUserUseCase = showUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const user = await this.showUserUseCase.execute({ id: Number(id) });
      response.json(user);
    } catch (err) {
      response.status(500).json({ msg: err.message });
    }
  }
}
