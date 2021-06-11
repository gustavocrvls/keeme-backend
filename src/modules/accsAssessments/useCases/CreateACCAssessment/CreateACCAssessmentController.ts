import { Request, Response } from 'express';
import { CreateACCAssessmentUseCase } from './CreateACCAssessmentUseCase';

export class CreateACCAssessmentController {
  private createACCAssessmentUseCase;

  constructor(createACCAssessmentUseCase: CreateACCAssessmentUseCase) {
    this.createACCAssessmentUseCase = createACCAssessmentUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { description, user, acc, acc_status } = request.body;

    try {
      await this.createACCAssessmentUseCase.execute({
        description,
        user,
        acc,
        acc_status,
      });
      response.sendStatus(201);
    } catch (err) {
      console.error(err);
      response.status(503).json({ msg: 'ACC Assessment not created' });
    }
  }
}
