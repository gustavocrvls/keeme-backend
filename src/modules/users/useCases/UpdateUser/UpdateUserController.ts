import { Request, Response } from 'express';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  private updateUserUseCase;

  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const {
      name,
      cpf,
      email,
      username,
      password,
      profile,
      course,
    } = request.body;

    const { id } = request.params;

    const data = {} as IUpdateUserRequestDTO;

    data.id = Number(id);
    if (name) data.name = name;
    if (cpf) data.cpf = cpf;
    if (email) data.email = email;
    if (username) data.username = username;
    if (password) data.password = password;
    if (profile) data.profile = profile;
    if (course) data.course = course;

    try {
      await this.updateUserUseCase.execute(data);
      response.sendStatus(200);
    } catch (err) {
      response.status(400).json({ msg: err.message });
    }
  }
}
