import { Request, Response } from 'express';
import { getTokenFieldsFromRequest, IToken } from '../../../../utils/jwt';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { course, registration, email, name, password, profile, username } =
      request.body;

    try {
      const token = getTokenFieldsFromRequest(request) ?? ({} as IToken);

      const newUser = await this.createUserUseCase.execute(
        {
          course,
          registration,
          email,
          name,
          password,
          profile,
          username,
        },
        token,
      );

      response.status(201).json(newUser);
    } catch (err: any) {
      response.status(400).json({ msg: err.message });
    }
  }
}
