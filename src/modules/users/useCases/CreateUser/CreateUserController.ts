import { Request, Response } from 'express';
import { getTokenFieldsFromRequest, IToken } from '../../../../utils/jwt';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { course, cpf, email, name, password, profile, username } =
      request.body;

    try {
      const token = getTokenFieldsFromRequest(request) ?? ({} as IToken);

      const formatedCPF = cpf.replace(/\D/g, '');

      console.log(formatedCPF);

      await this.createUserUseCase.execute(
        {
          course,
          cpf: formatedCPF,
          email,
          name,
          password,
          profile,
          username,
        },
        token,
      );

      response.sendStatus(200);
    } catch (error) {
      response.status(400).json({ msg: error.message });
    }
  }
}
