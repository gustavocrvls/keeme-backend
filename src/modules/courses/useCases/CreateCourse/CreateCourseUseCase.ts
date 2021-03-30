import { Course } from '../../../../entities/Course';
import { ICoursesRepository } from '../../../../repositories/ICoursesRepository';
import { ICreateCourseRequestDTO } from './CreateCourseDTO';

export class CreateCourseUseCase {
  private coursesRepository;

  constructor(coursesRepository: ICoursesRepository) {
    this.coursesRepository = coursesRepository;
  }

  async execute(data: ICreateCourseRequestDTO): Promise<void> {
    const course = new Course(data);

    this.coursesRepository.save(course);
  }
}
