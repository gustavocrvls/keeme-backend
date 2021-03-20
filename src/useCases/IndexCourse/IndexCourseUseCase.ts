import Curso from '../../models/Curso';
import { ICoursesRepository } from '../../repositories/ICoursesRepository';
import { IIndexCourseRequestDTO } from './IndexCourseDTO';

export class IndexCourseUseCase {
  private courseRepository;

  constructor(courseRepository: ICoursesRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(data: IIndexCourseRequestDTO): Promise<Curso[]> {
    const courses = await this.courseRepository.index(data);
    return courses;
  }
}
