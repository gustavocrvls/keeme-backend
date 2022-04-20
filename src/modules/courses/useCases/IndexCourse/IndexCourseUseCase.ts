import { IPaginatedArray } from '../../../../providers/IArrayPaginatorProvider';
import { ICoursesRepository } from '../../repositories/ICoursesRepository';
import { IIndexCourseRequestDTO } from './IndexCourseDTO';

export class IndexCourseUseCase {
  private coursesRepository;

  constructor(coursesRepository: ICoursesRepository) {
    this.coursesRepository = coursesRepository;
  }

  async execute(data: IIndexCourseRequestDTO): Promise<IPaginatedArray> {
    const courses = await this.coursesRepository.index(data);
    return courses;
  }
}
