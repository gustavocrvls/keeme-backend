import { Course } from '../entities/Course';
import { IIndexCourseRequestDTO } from '../modules/courses/useCases/IndexCourse/IndexCourseDTO';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';

export interface ICoursesRepository {
  create(course: Course): Promise<void>;
  index(data: IIndexCourseRequestDTO): Promise<IPaginatedArray>;
}
