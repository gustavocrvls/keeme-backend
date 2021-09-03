import { Request, Response } from 'express';
import { IGetCourseWithUsersDTO } from './GetCourseWithUsersDTO';
import { GetCourseWithUsersUseCase } from './GetCourseWithUsersUseCase';

export class GetCourseWithUsersController {
  private getCourseWithUsersUseCase: GetCourseWithUsersUseCase;

  constructor(getCourseWithUsersUseCase: GetCourseWithUsersUseCase) {
    this.getCourseWithUsersUseCase = getCourseWithUsersUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { profileId, courseId } = request.query;

    const data = {} as IGetCourseWithUsersDTO;

    if (profileId) data.profileId = Number(profileId);
    if (courseId) data.courseId = Number(courseId);

    try {
      const courses = await this.getCourseWithUsersUseCase.execute({
        profileId: Number(profileId),
        courseId: Number(courseId),
      });

      response.json({ data: courses });
    } catch (err: any) {
      response.status(500).json({ msg: err.message });
    }
  }
}
