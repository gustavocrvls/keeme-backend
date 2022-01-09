import { ICoursesRepository } from '../../repositories/ICoursesRepository';
import {
  ICourseWithUsers,
  IGetCourseWithUsersDTO,
} from './GetCourseWithUsersDTO';

export class GetCourseWithUsersUseCase {
  private coursesRepository: ICoursesRepository;

  constructor(coursesRepository: ICoursesRepository) {
    this.coursesRepository = coursesRepository;
  }

  async execute(data: IGetCourseWithUsersDTO): Promise<ICourseWithUsers[]> {
    const courses = await this.coursesRepository.getUsers(data);

    return courses;
  }
}
