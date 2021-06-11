import { Request, Response } from 'express';
import { CreateACCUseCase } from './CreateACCUseCase';

export class CreateACCController {
  private createACCUseCase;

  constructor(createACCUseCase: CreateACCUseCase) {
    this.createACCUseCase = createACCUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { acc_type, acc_variant, quantity, user, description } = request.body;

    const reqCertificate = request.files as Express.Multer.File[];
    const certificate = reqCertificate[0];

    try {
      const acc = await this.createACCUseCase.execute({
        acc_type: Number(<string>acc_type),
        quantity: Number(<string>quantity),
        acc_variant: Number(<string>acc_variant),
        user: Number(<string>user),
        description: <string>description,
        certificate,
      });
      response.status(201).json(acc);
    } catch (err) {
      console.error(err);
      response.status(404).json({ msg: 'Tipo de ACC não encontrado!' });
    }
  }
}
