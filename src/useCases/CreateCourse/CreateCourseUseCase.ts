import Curso from '../../models/Curso';
import { ICoursesRepository } from '../../repositories/ICoursesRepository';
import { ICreateCourseRequestDTO } from './CreateCourseDTO';

export class CreateCourseUseCase {
  private coursesRepository;

  constructor(coursesRepository: ICoursesRepository) {
    this.coursesRepository = coursesRepository;
  }

  async execute(data: ICreateCourseRequestDTO): Promise<void> {
    const course = new Curso(data);

    this.coursesRepository.save(course);
  }
}
