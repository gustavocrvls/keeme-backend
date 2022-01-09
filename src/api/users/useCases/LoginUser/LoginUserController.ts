import { Request, Response } from 'express';
import { LoginUserUseCase } from './LoginUserUseCase';

export class LoginUserController {
  private loginUserUseCase: LoginUserUseCase;

  constructor(loginUserUseCase: LoginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { username, password } = request.body;

    try {
      const userData = await this.loginUserUseCase.execute({
        username,
        password,
      });

      response.set('Access-Token', userData.token);
      response.json({
        auth: true,
        data: {
          id: userData.data?.id,
          name: userData.data?.name,
          profile: userData.data?.profile,
          course: userData.data?.course,
        },
      });
    } catch (err: any) {
      response.status(401).json({ msg: err.message });
    }
  }
}
