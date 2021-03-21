import Course from '../models/Curso';
import IArrayPaginatorProvider from '../providers/IArrayPaginatorProvider';
import { IIndexCourseRequestDTO } from '../useCases/IndexCourse/IndexCourseDTO';

export interface ICoursesRepository {
  save(course: Course): Promise<void>;
  index(data: IIndexCourseRequestDTO): Promise<Course[]>;
}
