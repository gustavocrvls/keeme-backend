import { Request, Response } from 'express';
import TipoDeAcc from '../../models/TipoDeAcc';
import { CreateACCTypeUseCase } from './CreateACCTypeUseCase';

export class CreateACCTypeController {
  private createACCTypeUseCase;

  constructor(createACCTypeUseCase: CreateACCTypeUseCase) {
    this.createACCTypeUseCase = createACCTypeUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const {
      nome,
      limite_de_pontos,
      descricao,
      unidade_de_medida,
      variantes_de_acc,
    } = request.body;

    const accType = new TipoDeAcc({
      nome,
      limite_de_pontos,
      descricao,
      unidade_de_medida,
      variantes_de_acc,
    });

    try {
      this.createACCTypeUseCase.execute(accType);
      response.sendStatus(201);
    } catch (err) {
      console.error(err);
      response.sendStatus(500);
    }
  }
}
