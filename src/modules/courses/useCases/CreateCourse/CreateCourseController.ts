import { Request, Response } from 'express';
import { CreateCourseUseCase } from './CreateCourseUseCase';

export class CreateCourseController {
  private createCourseUseCase;

  constructor(createCourseUseCase: CreateCourseUseCase) {
    this.createCourseUseCase = createCourseUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { name } = request.body;

    try {
      this.createCourseUseCase.execute({
        name,
      });
      response.sendStatus(201);
    } catch (err: any) {
      console.error(err);
      response.sendStatus(500);
    }
  }
}
