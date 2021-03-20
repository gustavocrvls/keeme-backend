import Course from '../models/Curso';
import { IIndexCourseRequestDTO } from '../useCases/IndexCourse/IndexCourseDTO';

/**
 * @author Gustavo Carvalho Silva
 * @since 19/03/2021
 * @interface MySQLCoursesRepository
 */
export interface ICoursesRepository {
  save(course: Course): Promise<void>;
  index(data: IIndexCourseRequestDTO): Promise<Course[]>;
}
