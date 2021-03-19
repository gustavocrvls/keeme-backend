import Course from '../models/Curso';

/**
 * @author Gustavo Carvalho Silva
 * @since 19/03/2021
 * @interface MySQLCoursesRepository
 */
export interface ICoursesRepository {
  save(course: Course): Promise<void>;
}
