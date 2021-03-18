import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  private createUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { nome, cpf, email, username, senha, curso } = request.body;

    this.createUserUseCase.execute({
      nome,
      cpf,
      email,
      username,
      senha,
      curso,
    });
  }
}
