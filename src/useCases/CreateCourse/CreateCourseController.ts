import { Request, Response } from 'express';
import { CreateCourseUseCase } from './CreateCourseUseCase';

export class CreateCourseController {
  private createCourseUseCase;

  constructor(createCourseUseCase: CreateCourseUseCase) {
    this.createCourseUseCase = createCourseUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { nome } = request.body;

    try {
      this.createCourseUseCase.execute({
        nome,
      });
      response.sendStatus(201);
    } catch (err) {
      console.error(err);
      response.sendStatus(500);
    }
  }
}
