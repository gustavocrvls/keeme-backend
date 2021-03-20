import Curso from '../../models/Curso';
import { ICoursesRepository } from '../../repositories/ICoursesRepository';
import { ICreateCourseRequestDTO } from './CreateCourseDTO';

export class CreateCourseUseCase {
  private courseRepository;

  constructor(courseRepository: ICoursesRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(data: ICreateCourseRequestDTO): Promise<void> {
    const course = new Curso(data);

    this.courseRepository.save(course);
  }
}
